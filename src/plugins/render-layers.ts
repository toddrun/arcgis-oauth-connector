import { MapPlugin } from "../map/arcgis-types";


const RenderLayers: (
  shouldRerender?: () => boolean,
) => MapPlugin = (
  shouldRerender = () => true,
) => {
  return {
    shouldRerender: (mapView) => shouldRerender(),
  };
};

export default RenderLayers;