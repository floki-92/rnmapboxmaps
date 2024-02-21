import React, { useRef, useState } from 'react';
import { Button } from 'react-native';
import {
  MapView,
  SkyLayer,
  Logger,
  Terrain,
  RasterDemSource,
  Atmosphere,
  Camera,
  UserTrackingMode,
  UserLocation,
  UserLocationRenderMode,
} from '@rnmapbox/maps';
import { View } from 'react-native';

Logger.setLogLevel('verbose');

const SetCameraInterrupt = () => {
  const cameraRef = useRef<Camera>(null);

  const [followUserLocation, setFollowUserLocation] = useState(true);
  const [followUserMode, setFollowUserMode] = useState(UserTrackingMode.Follow);
  const [followZoomLevel, setFollowZoomLevel] = useState();

  return (
    <>
      <View
        style={{
          flexDirection: "row",

        }}
      >
        <Button
          title="Change"


          onPress={() => {
            setFollowUserLocation(false)
            setFollowUserMode(UserTrackingMode.Follow)
            // setFollowZoomLevel(3)

            cameraRef.current?.setCamera(
              {
                animationDuration: 2000,
                animationMode: "flyTo",
                bounds: undefined,
                centerCoordinate: [10.836858, 51.438654],
                padding: { paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0 },
                zoomLevel: 7,
                pitch: 10
              }
            )
          }
          }
        />
        <Button
          title="follow user"


          onPress={() => {
            setFollowUserLocation(true)
            setFollowUserMode(UserTrackingMode.FollowWithCourse)
            // cameraRef.current?.setCamera({
            //   animationDuration: 2000,
            //   animationMode: "flyTo",
            //   bounds: undefined,
            //   centerCoordinate: [10.465790, 51.789972],
            //   padding: { paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0 },
            //   zoomLevel: 7
            // }
            // )
          }

          }
        />

      </View>
      <MapView
        style={{ flex: 1 }}
        styleURL={'mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y'}

      >
        <Camera
          ref={cameraRef}
          centerCoordinate={[
            // -74.00597, 40.71427
            // -122.4189591, 37.6614238,
            // -114.34411, 32.6141,
            10.810673, 51.572306
            
          ]}
          // zoomLevel={13.1}
          followUserLocation={followUserLocation}
          followUserMode={followUserMode}
          followZoomLevel={followZoomLevel}
        // heading={80}
        // pitch={85}
        />
        <UserLocation
          androidRenderMode={'gps'}
          showsUserHeadingIndicator={true}
          // animated={false}
          minDisplacement={0}
          // renderMode={Platform.OS === "android" ? UserLocationRenderMode.Native : UserLocationRenderMode.Normal}
          renderMode={UserLocationRenderMode.Native}
        >
        </UserLocation>

      </MapView>
    </>
  );
};

export default SetCameraInterrupt;

/* end-example-doc */

/** @type ExampleWithMetadata['metadata'] */
const metadata = {
  title: 'Test Camera Interrupt',
  tags: ['RasterDemSource', 'Terrain', 'Atmosphere', 'SkyLayer'],
  docs: `
Demostrates use of Terran, Atmosphere and SkyLayer.
`,
};
SetCameraInterrupt.metadata = metadata;
