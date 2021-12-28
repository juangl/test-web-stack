import React from "react";
import Image from "next/image";
import styles from "../styles/mapPreview.module.css";

type Coordinates = [longitude: number, latitude: number];

const IMAGE_WIDTH = 518;
const IMAGE_HEIGHT = 336;
const IMAGE_ZOOM = 10;
/**
 * Get Mapbox static image URL from the given coordinates
 */
function getMapboxStaticImageURL(coordinates: Coordinates) {
  const coordinatesStr = coordinates.join(",");
  return `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${coordinatesStr},${IMAGE_ZOOM}/${IMAGE_WIDTH}x${IMAGE_HEIGHT}?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_KEY}`;
}

/**
 * Get address coordinates from the given address string
 */
async function resolveAddressCoordinates(address: string) {
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address,
    )}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_KEY}&limit=1`,
  );
  const payload = await response.json();
  if (!payload.features.length) {
    return null;
  }

  return payload.features[0].geometry.coordinates as Coordinates;
}

interface MapPreviewProps {
  address: string;
}
export default function MapPreview(props: MapPreviewProps) {
  const [coordinates, setCoordinates] = React.useState<Coordinates | null>(
    null,
  );
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    let canceled = false;
    setIsLoading(true);
    resolveAddressCoordinates(props.address).then((coordinates) => {
      if (!canceled) {
        setCoordinates(coordinates);
        setIsLoading(false);
      }
    });

    () => {
      canceled = true;
    };
  }, [props.address]);

  return (
    <div className={styles.mapPreviewContainer}>
      {coordinates && (
        <Image
          src={getMapboxStaticImageURL(coordinates)}
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
          alt={props.address}
        />
      )}
      <div className={styles.mapOverlay}>
        {isLoading
          ? "Loading"
          : coordinates
          ? "MAP WITH ADDRESS"
          : "No Map Found"}
      </div>
    </div>
  );
}
