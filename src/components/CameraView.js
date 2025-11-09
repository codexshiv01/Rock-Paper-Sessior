import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, Platform } from 'react-native';
import { CameraView as ExpoCameraView, Camera } from 'expo-camera';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import { COLORS, GESTURE_EMOJIS } from '../utils/constants';
import { detectGesture, validateStableGesture } from '../utils/gestureDetection';

// Dynamically import hand-pose-detection to avoid loading MediaPipe in React Native
let handPoseDetection = null;
let HandPoseDetectionModule = null;

// Compatibility shim for expo-camera v17+ (TensorFlow expects old API)
// Create a Constants object that TensorFlow can use
const CameraConstants = {
  Type: {
    back: 'back',
    front: 'front',
  },
};

// Add Constants to the ExpoCameraView for TensorFlow compatibility
if (!ExpoCameraView.Constants) {
  ExpoCameraView.Constants = CameraConstants;
}

// Create a compatibility wrapper component that mimics the old Camera API
// This allows TensorFlow's cameraWithTensors to work with the new CameraView
const CompatibleCamera = React.forwardRef((props, ref) => {
  // Map 'type' prop to 'facing' prop for expo-camera v17
  const { type, onCameraReady, ...otherProps } = props;
  const facing = type === CameraConstants.Type.front ? 'front' : 'back';
  
  // Handle camera ready callback
  const handleCameraReady = () => {
    console.log('📹 ExpoCameraView is ready');
    if (onCameraReady) {
      onCameraReady();
    }
  };
  
  return (
    <ExpoCameraView 
      {...otherProps} 
      ref={ref} 
      facing={facing}
      onCameraReady={handleCameraReady}
    />
  );
});

// Add Constants to the CompatibleCamera for TensorFlow
CompatibleCamera.Constants = CameraConstants;
// Set display name for debugging
CompatibleCamera.displayName = 'CompatibleCamera';

const TensorCamera = cameraWithTensors(CompatibleCamera);
const { width, height } = Dimensions.get('window');

const CameraView = ({ onGestureDetected, isActive }) => {
  const [tfReady, setTfReady] = useState(false);
  const [model, setModel] = useState(null);
  const [currentGesture, setCurrentGesture] = useState('none');
  const [hasPermission, setHasPermission] = useState(null);
  const [handDetected, setHandDetected] = useState(false);
  const [gestureHistoryLength, setGestureHistoryLength] = useState(0);
  const gestureHistoryRef = useRef([]);
  const frameCount = useRef(0);

  useEffect(() => {
    (async () => {
      try {
        // expo-camera v17+ uses useCameraPermissions hook, but we'll use the async method
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      } catch (error) {
        console.error('Error requesting camera permissions:', error);
        setHasPermission(false);
      }
    })();
  }, []);

  useEffect(() => {
    const initTensorFlow = async () => {
      try {
        console.log('Initializing TensorFlow for React Native...');
        console.log('Platform:', Platform.OS);
        
        // Wait for TensorFlow to be ready
        await tf.ready();
        console.log('TensorFlow ready, backend:', tf.getBackend());
        
        // Dynamically import hand-pose-detection
        // Try to import it in a way that avoids MediaPipe dependencies
        if (!handPoseDetection) {
          console.log('Importing hand-pose-detection module...');
          try {
            // Try to require the module
            HandPoseDetectionModule = require('@tensorflow-models/hand-pose-detection');
            handPoseDetection = HandPoseDetectionModule;
            console.log('Hand-pose-detection imported successfully');
            
            // Check if MediaPipe is being loaded (this might cause issues)
            if (typeof global !== 'undefined' && global.mediapipe) {
              console.warn('MediaPipe detected in global scope - this may cause issues in React Native');
            }
          } catch (importError) {
            console.error('Failed to import hand-pose-detection:', importError);
            throw importError;
          }
        }
        
        // Check available models
        if (handPoseDetection && handPoseDetection.SupportedModels) {
          console.log('Available models:', Object.keys(handPoseDetection.SupportedModels));
        }
        
        // For React Native, we MUST use 'tfjs' runtime, not 'mediapipe'
        // MediaPipe runtime requires browser APIs that don't exist in React Native
        let detector = null;
        let configAttempts = [
          {
            runtime: 'tfjs',
            modelType: 'lite',
            maxHands: 1,
          },
          {
            runtime: 'tfjs',
            modelType: 'full',
            maxHands: 1,
          },
        ];
        
        for (let i = 0; i < configAttempts.length; i++) {
          try {
            const config = configAttempts[i];
            console.log(`Attempt ${i + 1}: Creating detector with config:`, JSON.stringify(config));
            
            // Explicitly use tfjs runtime - this should avoid MediaPipe dependencies
            detector = await handPoseDetection.createDetector(
              handPoseDetection.SupportedModels.MediaPipeHands,
              config
            );
            
            console.log(`✅ Hand detector created successfully with config ${i + 1}`);
            break;
          } catch (configError) {
            console.error(`Config ${i + 1} failed:`, configError.message);
            console.error('Error details:', configError);
            if (i === configAttempts.length - 1) {
              // Last attempt failed, throw the error
              throw configError;
            }
          }
        }
        
        if (detector) {
          setModel(detector);
          setTfReady(true);
          console.log('✅ TensorFlow initialization complete');
        } else {
          throw new Error('Failed to create detector with all configurations');
        }
      } catch (error) {
        console.error('❌ Error initializing TensorFlow:', error);
        console.error('Error message:', error.message);
        console.error('Error name:', error.name);
        if (error.stack) {
          console.error('Error stack:', error.stack.substring(0, 500));
        }
        
        // Provide helpful error message
        if (error.message && error.message.includes('prototype')) {
          console.error('');
          console.error('═══════════════════════════════════════════════════════');
          console.error('MediaPipe Compatibility Issue Detected');
          console.error('═══════════════════════════════════════════════════════');
          console.error('The MediaPipeHands model has dependencies on MediaPipe');
          console.error('libraries that require browser APIs not available in React Native.');
          console.error('');
          console.error('Possible solutions:');
          console.error('1. Check if @tensorflow-models/hand-pose-detection version supports React Native');
          console.error('2. Try using a different hand detection model');
          console.error('3. Check TensorFlow.js and React Native compatibility');
          console.error('═══════════════════════════════════════════════════════');
        }
      }
    };

    initTensorFlow();

    return () => {
      if (model) {
        console.log('Disposing model...');
        try {
          model.dispose();
        } catch (error) {
          console.error('Error disposing model:', error);
        }
      }
    };
  }, []);

  // Use a ref to store the latest model so the callback always has access to it
  const modelRef = useRef(null);
  useEffect(() => {
    modelRef.current = model;
  }, [model]);

  const handleCameraStream = async (images, updatePreview, gl, cameraTexture) => {
    console.log('🎥 Camera stream started!');
    console.log('🎥 Model available (ref):', !!modelRef.current);
    console.log('🎥 Model available (state):', !!model);
    console.log('🎥 isActive:', isActive);
    console.log('🎥 Images iterator:', !!images);
    console.log('🎥 Images type:', typeof images);
    console.log('🎥 Images.next:', typeof images?.next);
    console.log('🎥 updatePreview:', !!updatePreview);
    console.log('🎥 gl context:', !!gl);
    console.log('🎥 cameraTexture:', !!cameraTexture);
    
    if (!images) {
      console.error('❌ No images iterator provided!');
      return;
    }
    
    if (typeof images.next !== 'function') {
      console.error('❌ Images is not an iterator! Type:', typeof images, 'Value:', images);
      return;
    }
    
    if (!modelRef.current) {
      console.error('❌ Model not available yet, will wait and retry...');
      // Poll until model is ready
      const checkModel = setInterval(() => {
        if (modelRef.current) {
          console.log('✅ Model is now available, starting camera stream');
          clearInterval(checkModel);
          handleCameraStream(images);
        }
      }, 500);
      
      // Stop checking after 10 seconds
      setTimeout(() => {
        clearInterval(checkModel);
        if (!modelRef.current) {
          console.error('❌ Model still not available after 10 seconds');
        }
      }, 10000);
      return;
    }
    
    // Process frames continuously
    const processFrame = async () => {
      const currentModel = modelRef.current;
      
      if (!currentModel) {
        console.log('⚠️ Model not available in processFrame, waiting...');
        setTimeout(() => processFrame(), 500);
        return;
      }
      
      if (!isActive) {
        // Still process frames to keep the stream alive, but skip gesture detection
        try {
          const { value: tensor, done } = await images.next();
          if (done) {
            console.log('📹 Camera stream ended (game inactive)');
            return;
          }
          if (tensor) {
            tf.dispose(tensor);
          }
          setTimeout(() => processFrame(), 100);
        } catch (error) {
          console.error('Error in inactive frame processing:', error);
          setTimeout(() => processFrame(), 100);
        }
        return;
      }

      try {
        const { value: tensor, done } = await images.next();
        
        if (done) {
          console.log('📹 Camera stream ended');
          return;
        }

        if (!tensor) {
          console.log('⚠️ No tensor in frame, continuing...');
          // Continue processing if no tensor
          processFrame();
          return;
        }

        // Process every 3rd frame for better responsiveness
        frameCount.current++;
        const shouldProcess = frameCount.current % 3 === 0;
        
        if (!shouldProcess) {
          tf.dispose(tensor);
          processFrame();
          return;
        }
        
        // Log every 10th processed frame to avoid spam
        if (frameCount.current % 30 === 0) {
          console.log(`📸 Processing frame ${frameCount.current}...`);
        }

        try {
          // Log tensor info occasionally
          if (frameCount.current % 30 === 0) {
            console.log(`📊 Tensor info - Shape: [${tensor.shape}], dtype: ${tensor.dtype}`);
          }
          
          // Estimate hands in the frame using the ref model
          const startTime = Date.now();
          const hands = await currentModel.estimateHands(tensor, {
            flipHorizontal: false,
            maxHands: 1,
          });
          const detectionTime = Date.now() - startTime;
          
          // Always log detection results for debugging
          if (hands && hands.length > 0) {
            console.log(`✅✅✅ Hands found: ${hands.length} hand(s) (took ${detectionTime}ms)`);
            const hand = hands[0];
            if (hand.keypoints) {
              console.log(`   Keypoints: ${hand.keypoints.length} points`);
              console.log(`   Confidence: ${hand.score || 'N/A'}`);
            }
          } else {
            // Log every 10th frame when no hands
            if (frameCount.current % 30 === 0) {
              console.log(`👀 No hands detected (frame ${frameCount.current}, took ${detectionTime}ms)`);
            }
          }

          if (hands && hands.length > 0) {
            setHandDetected(true);
            const hand = hands[0];
            const landmarks = hand.keypoints;
            
            if (landmarks && landmarks.length >= 21) {
              const gesture = detectGesture(landmarks);
              
              console.log('👋 Hand detected! Gesture:', gesture);
              console.log('📊 Gesture history:', gestureHistoryRef.current);
              console.log('🎮 Game state - isActive:', isActive);
              
              setCurrentGesture(gesture);
              
              // Add to history if not 'none'
              if (gesture !== 'none') {
                gestureHistoryRef.current.push(gesture);

                // Keep only last 15 gestures for better tracking
                if (gestureHistoryRef.current.length > 15) {
                  gestureHistoryRef.current.shift();
                }
                
                // Update state for UI display
                setGestureHistoryLength(gestureHistoryRef.current.length);

                // Reduced stability requirement: only need 2 consecutive same gestures
                if (gestureHistoryRef.current.length >= 2) {
                  const stableGesture = validateStableGesture(gestureHistoryRef.current, 2);
                  console.log('🔍 Checking stability. Required: 2, History length:', gestureHistoryRef.current.length);
                  console.log('✅ Stable gesture result:', stableGesture);
                  
                  if (stableGesture) {
                    if (isActive) {
                      console.log('🎉✅✅✅ STABLE GESTURE DETECTED:', stableGesture);
                      console.log('📞 Calling onGestureDetected callback...');
                      try {
                        onGestureDetected(stableGesture);
                        console.log('✅ Callback called successfully');
                        // Clear history after successful detection
                        gestureHistoryRef.current = [];
                        setGestureHistoryLength(0);
                      } catch (callbackError) {
                        console.error('❌ Error calling onGestureDetected:', callbackError);
                      }
                    } else {
                      console.log('⚠️ Gesture detected but game is not active (isActive:', isActive, ')');
                    }
                  } else {
                    console.log('⏳ Gesture not stable yet. Current:', gesture, 'History:', gestureHistoryRef.current.slice(-3));
                  }
                }
              } else {
                // Clear history if no gesture detected, but keep hand detection
                console.log('❓ No valid gesture detected (gesture: none)');
                if (gestureHistoryRef.current.length > 8) {
                  console.log('🧹 Clearing old gesture history');
                  gestureHistoryRef.current = [];
                  setGestureHistoryLength(0);
                }
              }
            } else {
              console.log('⚠️ Invalid landmarks count:', landmarks?.length, '(expected: 21)');
              setCurrentGesture('none');
              setHandDetected(false);
            }
          } else {
            if (handDetected) {
              console.log('👋➡️❌ Hand disappeared');
            }
            setCurrentGesture('none');
            setHandDetected(false);
            // Clear history when no hands detected
            if (gestureHistoryRef.current.length > 0) {
              console.log('🧹 Clearing gesture history (no hands)');
              gestureHistoryRef.current = [];
              setGestureHistoryLength(0);
            }
          }
        } catch (error) {
          console.error('❌ Error processing hand detection:', error);
          console.error('Error details:', error.message, error.stack);
        } finally {
          // Always dispose of the tensor
          try {
            tf.dispose(tensor);
          } catch (disposeError) {
            console.error('Error disposing tensor:', disposeError);
          }
        }

        // Continue processing next frame
        processFrame();
      } catch (error) {
        console.error('❌ Error in frame processing:', error);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack?.substring(0, 200));
        // Continue processing even if there's an error
        // Add a small delay to prevent infinite error loops
        setTimeout(() => processFrame(), 100);
      }
    };

    // Start processing frames
    console.log('🚀 Starting frame processing loop...');
    processFrame();
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No access to camera</Text>
        <Text style={styles.errorSubtext}>Please enable camera permission in settings</Text>
      </View>
    );
  }

  if (!tfReady || !model) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading AI model...</Text>
      </View>
    );
  }

  // Log when component renders
  useEffect(() => {
    console.log('📷 CameraView rendered. tfReady:', tfReady, 'model:', !!model, 'hasPermission:', hasPermission, 'isActive:', isActive);
  }, [tfReady, model, hasPermission, isActive]);
  
  // Store the images iterator in a ref so we can access it later
  const imagesIteratorRef = useRef(null);
  
  // Effect to check if camera stream should start
  useEffect(() => {
    if (tfReady && model && hasPermission && imagesIteratorRef.current) {
      console.log('🔄 All conditions met, camera stream should be active');
      console.log('🔄 Model:', !!model, 'isActive:', isActive);
    }
  }, [tfReady, model, hasPermission, isActive]);

  // Add a timeout to check if onReady is ever called
  useEffect(() => {
    if (tfReady && model && hasPermission) {
      const timeout = setTimeout(() => {
        if (!imagesIteratorRef.current) {
          console.error('⚠️⚠️⚠️ WARNING: Camera stream onReady was never called after 5 seconds!');
          console.error('This suggests the camera/GL integration is not working properly.');
          console.error('Possible causes:');
          console.error('1. expo-gl is not properly configured');
          console.error('2. expo-camera v17 compatibility issue with TensorFlow');
          console.error('3. GL context creation is failing');
          console.error('4. Camera texture creation is failing');
        }
      }, 5000);
      
      return () => clearTimeout(timeout);
    }
  }, [tfReady, model, hasPermission]);

  return (
    <View style={styles.container}>
      {tfReady && model ? (
        <>
          <TensorCamera
            style={styles.camera}
            type={CameraConstants.Type.front}
            cameraTextureHeight={1080}
            cameraTextureWidth={1920}
            resizeHeight={224}
            resizeWidth={224}
            resizeDepth={3}
            onReady={(images, updatePreview, gl, cameraTexture) => {
              console.log('🎬✅✅✅✅✅✅✅ TensorCamera onReady callback triggered!');
              console.log('🎬 Arguments received:', {
                images: !!images,
                imagesType: typeof images,
                hasNext: typeof images?.next === 'function',
                updatePreview: !!updatePreview,
                gl: !!gl,
                glType: gl?.constructor?.name,
                cameraTexture: !!cameraTexture,
                textureType: typeof cameraTexture
              });
              
              // Store the iterator in a ref
              imagesIteratorRef.current = images;
              
              if (!images) {
                console.error('❌ No images iterator provided!');
                return;
              }
              
              if (typeof images.next !== 'function') {
                console.error('❌ Images is not an iterator!');
                console.error('Images value:', images);
                console.error('Images type:', typeof images);
                console.error('Images keys:', images ? Object.keys(images) : 'null');
                return;
              }
              
              if (!gl) {
                console.error('❌ No GL context provided!');
                return;
              }
              
              if (!cameraTexture) {
                console.error('❌ No camera texture provided!');
                return;
              }
              
              console.log('🎬✅ All checks passed! Starting camera stream handler...');
              console.log('🎬 Model available:', !!modelRef.current);
              console.log('🎬 isActive:', isActive);
              
              // Start the camera stream handler
              handleCameraStream(images, updatePreview, gl, cameraTexture);
            }}
            autorender={true}
            onCameraReady={() => {
              console.log('📹✅ Camera ready callback fired');
            }}
            onMountError={(error) => {
              console.error('❌ Camera mount error:', error);
              console.error('Error message:', error?.message);
              console.error('Error details:', error?.nativeEvent);
            }}
            onLayout={(event) => {
              const { width, height } = event.nativeEvent.layout;
              console.log('📐 Camera layout:', { width, height });
            }}
          />
          {/* Debug overlay to show camera is rendering */}
          <View style={styles.debugOverlay}>
            <Text style={styles.debugText}>Camera: {tfReady && model ? 'Ready' : 'Loading...'}</Text>
            <Text style={styles.debugText}>Stream: {imagesIteratorRef.current ? 'Active' : 'Waiting...'}</Text>
          </View>
        </>
      ) : (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>
            {!tfReady ? 'Loading AI model...' : !model ? 'Initializing detector...' : 'Setting up camera...'}
          </Text>
        </View>
      )}
      
      <View style={styles.overlay}>
        <View style={styles.gestureIndicator}>
          <Text style={styles.gestureEmoji}>
            {GESTURE_EMOJIS[currentGesture]}
          </Text>
          <Text style={styles.gestureText}>
            {currentGesture !== 'none' 
              ? currentGesture.toUpperCase() 
              : handDetected 
                ? 'Detecting gesture...' 
                : 'Show your hand'}
          </Text>
          {handDetected && (
            <View style={styles.statusRow}>
              <Text style={styles.debugText}>
                ✓ Hand detected
              </Text>
              {gestureHistoryLength > 0 && (
                <Text style={styles.historyText}>
                  History: {gestureHistoryLength} gestures
                </Text>
              )}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.dark,
  },
  camera: {
    width: width,
    height: height * 0.6,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  gestureIndicator: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 200,
  },
  gestureEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  gestureText: {
    color: COLORS.light,
    fontSize: 18,
    fontWeight: '600',
  },
  loadingText: {
    color: COLORS.light,
    fontSize: 16,
    marginTop: 16,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  errorSubtext: {
    color: COLORS.gray,
    fontSize: 14,
    textAlign: 'center',
  },
  debugText: {
    color: COLORS.success,
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    width: '100%',
  },
  historyText: {
    color: COLORS.gray,
    fontSize: 10,
    fontStyle: 'italic',
  },
  debugOverlay: {
    position: 'absolute',
    bottom: 100,
    left: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 8,
    borderRadius: 8,
  },
});

export default CameraView;




