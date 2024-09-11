import { MapPlugin }  from "../arcgis/arcgis-mapview";

const RenderLayers: (
  shouldRerender?: () => boolean,
) => MapPlugin = (
  shouldRerender = () => false,
) => {
  return {
    shouldRerender: (mapView) => shouldRerender(),
  };
};

export default RenderLayers;