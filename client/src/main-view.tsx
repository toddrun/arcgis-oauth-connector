import React from 'react';
import ArcgisMapview from './arcgis/arcgis-mapview';

interface Props {
  apiKey: string | undefined
}

const MainView: React.FC<Props> = ({apiKey}) => {
  
  const plugins = [
    // RenderLayers(() => {
    //   // console.log('@ !!! renderLayers |  calling shouldrefresh');
    //   const shouldRefresh = state?.requestUpdateLayers ?? false;
    //   if (shouldRefresh) {
    //     setState({  ...state, requestUpdateLayers: false });
    //   }
    //   return shouldRefresh;
    // },)
  ]


  // return apiKey ? (
  //   <main className="main-view">
  //     <ArcgisMapview plugins={plugins}/>
  //   </main>
  // ) : <></>
  // ;

  return (
      <main className="main-view">
        <ArcgisMapview plugins={plugins}/>
      </main>
    );
}

export default MainView;