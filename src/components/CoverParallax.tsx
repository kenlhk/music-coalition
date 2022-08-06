import { Text } from "@nextui-org/react";
import { IParallax, Parallax, ParallaxLayer } from "@react-spring/parallax";
import { useRef } from "react";
import CoverCube from "./CoverCube";
import TrackCard from "./track/TrackCard";

interface CoverParallaxProps {
  sampleTracks?: SpotifyApi.TrackObjectFull[];
}

// Little helpers ...
const url = (name: string, wrap = false) =>
  `${
    wrap ? "url(" : ""
  }https://awv3node-homepage.surge.sh/build/assets/${name}.svg${
    wrap ? ")" : ""
  }`;

const CoverParallax = (props: CoverParallaxProps) => {
  const parallax = useRef<IParallax>(null!);
  return (
    <div style={{ width: "100%", height: "100%", background: "#253237" }}>
      <Parallax
        ref={parallax}
        pages={3}
        style={{ width: "100vw", position: "absolute", top: 0 }}
      >
        <ParallaxLayer
          offset={1}
          speed={1}
          style={{ backgroundColor: "#10253E" }}
        />
        <ParallaxLayer
          offset={2}
          speed={1}
          style={{ backgroundColor: "#000000" }}
        />

        <ParallaxLayer
          offset={0}
          speed={0}
          factor={3}
          style={{
            backgroundImage: url("stars", true),
            backgroundSize: "cover",
          }}
        />

        <ParallaxLayer
          offset={1.0}
          speed={-0.3}
          style={{ pointerEvents: "none" }}
        >
          <img
            src={"/Music_Isometric.svg"}
            style={{ width: "50%", marginLeft: "50%" }}
          />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
          <img
            src={url("cloud")}
            style={{ display: "block", width: "20%", marginLeft: "65%" }}
          />
          <img
            src={url("cloud")}
            style={{ display: "block", width: "10%", marginLeft: "15%" }}
          />
        </ParallaxLayer>

        <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
          <img
            src={url("cloud")}
            style={{ display: "block", width: "20%", marginLeft: "70%" }}
          />
          <img
            src={url("cloud")}
            style={{ display: "block", width: "20%", marginLeft: "40%" }}
          />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
          <img
            src={url("cloud")}
            style={{ display: "block", width: "10%", marginLeft: "10%" }}
          />
          <img
            src={url("cloud")}
            style={{ display: "block", width: "20%", marginLeft: "75%" }}
          />
        </ParallaxLayer>

        <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
          <img
            src={url("cloud")}
            style={{ display: "block", width: "20%", marginLeft: "60%" }}
          />
          <img
            src={url("cloud")}
            style={{ display: "block", width: "25%", marginLeft: "30%" }}
          />
          <img
            src={url("cloud")}
            style={{ display: "block", width: "10%", marginLeft: "80%" }}
          />
        </ParallaxLayer>

        <ParallaxLayer offset={2.6} speed={0.4} style={{ opacity: 0.6 }}>
          <img
            src={url("cloud")}
            style={{ display: "block", width: "20%", marginLeft: "5%" }}
          />
          <img
            src={url("cloud")}
            style={{ display: "block", width: "15%", marginLeft: "75%" }}
          />
        </ParallaxLayer>

        <ParallaxLayer
          offset={2.5}
          speed={-0.4}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <img src={url("earth")} style={{ width: "60%" }} />
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={-0.3}
          style={{
            backgroundSize: "80%",
            backgroundPosition: "center",
            // backgroundImage: url("clients", true),
          }}
        />

        <ParallaxLayer
          offset={-0.001}
          speed={0.1}
          onClick={() => parallax.current.scrollTo(1)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="flex flex-col items-center w-[90%] h-[50%] lg:h-[70%]">
            <CoverCube />
            <Text size={30}>
              Welcome to{" "}
              <Text
                span
                size={30}
                css={{
                  textGradient: "45deg, $blue600 -20%, $pink600 50%",
                }}
                weight={"bold"}
              >
                MusicCube
              </Text>
              !
            </Text>
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={0.1}
          onClick={() => parallax.current.scrollTo(2)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <img src="/Panel_Page.png" style={{ width: "60vw" }} />
            <Text
              span
              css={{
                // textGradient: "45deg, $blue600 -20%, $pink600 50%",
                fontSize: "2vw",
              }}
              weight={"bold"}
            >
              Discover new songs based on your preferences
            </Text>
          </div>
        </ParallaxLayer>

        {/* Sample tracks */}

        <ParallaxLayer
          offset={2}
          speed={-0}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => parallax.current.scrollTo(0)}
        >
          <div className="border">
            <div style={{ position: "absolute", right: "10%", bottom: "45%" }}>
              <TrackCard
                track={props.sampleTracks![2]}
                height="100%"
                width="100%"
              />
            </div>
            <div style={{ position: "absolute", left: "12%", bottom: "35%" }}>
              <TrackCard
                track={props.sampleTracks![1]}
                height="100%"
                width="100%"
              />
            </div>
            <div style={{ position: "absolute", left: "40%", bottom: "25%" }}>
              <TrackCard
                track={props.sampleTracks![0]}
                height="100%"
                width="100%"
              />
            </div>
            <div style={{ position: "absolute", left: "24%", bottom: "18%" }}>
              <Text
                span
                css={{
                  // textGradient: "45deg, $blue600 -20%, $pink600 50%",
                  fontSize: "2.5vw",
                }}
                weight={"bold"}
              >
                Access songs around the globe along with videos and lyrics
              </Text>
            </div>
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};

export default CoverParallax;
