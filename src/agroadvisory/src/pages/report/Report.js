import React from 'react';
import axios from "axios";
import html2canvas from "html2canvas";
import JsPDF from "jspdf";
import { Carousel, CarouselItem } from 'react-bootstrap';
import {useSelector} from 'react-redux';
import center from "@turf/center";
import Select from 'react-select'

import './Report.css'
import MapHeader from '../../components/map_header/MapHeader';
import Map from '../../components/map/Map';
import GeoFeatures from '../../services/GeoFeatures';
import DonutChart from '../../components/chart/DonutCharts';
import ColumnChart from '../../components/chart/ColumnChart';
import Configuration from "../../conf/Configuration";
const bbox = require('geojson-bbox');

function Report() {

    const donutChartData = JSON.parse('{"forecast":"63614e0e7ada085a61072178","confidence":0.5,"climate":[{"weather_station":"5ebad1b04c06b707e80d619d","performance":[{"measure":"goodness","value":0,"year":2022,"month":11},{"measure":"kendall","value":0,"year":2022,"month":11},{"measure":"pearson","value":0.383631885,"year":2022,"month":11},{"measure":"canonica","value":0,"year":2022,"month":11},{"measure":"afc2","value":61.95652008,"year":2022,"month":11},{"measure":"groc","value":62.5,"year":2022,"month":11},{"measure":"ignorance","value":1.504941463,"year":2022,"month":11},{"measure":"rpss","value":10.00738716,"year":2022,"month":11},{"measure":"spearman","value":0.353043467,"year":2022,"month":11},{"measure":"goodness","value":0,"year":2023,"month":2},{"measure":"kendall","value":0,"year":2023,"month":2},{"measure":"pearson","value":-0.180309683,"year":2023,"month":2},{"measure":"canonica","value":0,"year":2023,"month":2},{"measure":"afc2","value":37.31884003,"year":2023,"month":2},{"measure":"groc","value":68.75,"year":2023,"month":2},{"measure":"ignorance","value":1.721088052,"year":2023,"month":2},{"measure":"rpss","value":-3.971344233,"year":2023,"month":2},{"measure":"spearman","value":-0.338260859,"year":2023,"month":2}],"data":[{"year":2022,"month":11,"probabilities":[{"measure":"prec","lower":0.546114998,"normal":0.183562279,"upper":0.270322762}]},{"year":2023,"month":2,"probabilities":[{"measure":"prec","lower":0.320849648,"normal":0.194602814,"upper":0.484547539}]}]}],"scenario":[{"weather_station":"5ebad1b04c06b707e80d619d","name":"max","year":2022,"monthly_data":[{"month":9,"data":[{"measure":"prec","value":30.032522805035114},{"measure":"sol_rad","value":21.555918223769577},{"measure":"t_max","value":24.88847852636268},{"measure":"t_min","value":12.145525966750261}]},{"month":10,"data":[{"measure":"prec","value":91.00495254993437},{"measure":"sol_rad","value":25.379190568001047},{"measure":"t_max","value":27.834291704239405},{"measure":"t_min","value":13.536091650685968}]},{"month":11,"data":[{"measure":"prec","value":46.737415075302096},{"measure":"sol_rad","value":23.188120333353684},{"measure":"t_max","value":28.126663589477552},{"measure":"t_min","value":13.244453303019217}]},{"month":12,"data":[{"measure":"prec","value":10.218674041330813},{"measure":"sol_rad","value":22.340888669413907},{"measure":"t_max","value":28.642619655978297},{"measure":"t_min","value":12.461243844801398}]}]},{"weather_station":"5ebad1b04c06b707e80d619d","name":"min","year":2022,"monthly_data":[{"month":9,"data":[{"measure":"prec","value":30.032522805035114},{"measure":"sol_rad","value":21.555918223769577},{"measure":"t_max","value":24.88847852636268},{"measure":"t_min","value":12.145525966750261}]},{"month":10,"data":[{"measure":"prec","value":12.095754086971278},{"measure":"sol_rad","value":19.82185443755119},{"measure":"t_max","value":24.38164809442337},{"measure":"t_min","value":10.35664726072743}]},{"month":11,"data":[{"measure":"prec","value":6.45729207992553},{"measure":"sol_rad","value":19.17683188120524},{"measure":"t_max","value":24.26781959533692},{"measure":"t_min","value":10.303937085469569}]},{"month":12,"data":[{"measure":"prec","value":0},{"measure":"sol_rad","value":18.220233948000015},{"measure":"t_max","value":24.53418085652014},{"measure":"t_min","value":9.403316436275361}]}]},{"weather_station":"5ebad1b04c06b707e80d619d","name":"avg","year":2022,"monthly_data":[{"month":9,"data":[{"measure":"prec","value":30.032522805035114},{"measure":"sol_rad","value":21.555918223769577},{"measure":"t_max","value":24.88847852636268},{"measure":"t_min","value":12.145525966750261}]},{"month":10,"data":[{"measure":"prec","value":35.56548392578959},{"measure":"sol_rad","value":22.927418219351},{"measure":"t_max","value":26.247840792132973},{"measure":"t_min","value":12.123258046642436}]},{"month":11,"data":[{"measure":"prec","value":13.204510618969794},{"measure":"sol_rad","value":21.730698757171627},{"measure":"t_max","value":26.774872771581027},{"measure":"t_min","value":11.853712083657593}]},{"month":12,"data":[{"measure":"prec","value":2.948200685232877},{"measure":"sol_rad","value":20.814849243164065},{"measure":"t_max","value":26.876253433227554},{"measure":"t_min","value":11.04846664013402}]}]},{"weather_station":"5ebad1b04c06b707e80d619d","name":"max","year":2023,"monthly_data":[{"month":1,"data":[{"measure":"prec","value":8.67360603809357},{"measure":"sol_rad","value":20.068387062318862},{"measure":"t_max","value":28.59440452821794},{"measure":"t_min","value":12.588253052003937}]},{"month":2,"data":[{"measure":"prec","value":6.63042545318603},{"measure":"sol_rad","value":25.044287613460007},{"measure":"t_max","value":33.04054634911674},{"measure":"t_min","value":13.956441334315715}]},{"month":3,"data":[{"measure":"prec","value":33.38969987630841},{"measure":"sol_rad","value":25.7069596321352},{"measure":"t_max","value":31.935010479342555},{"measure":"t_min","value":16.13501191908314}]}]},{"weather_station":"5ebad1b04c06b707e80d619d","name":"min","year":2023,"monthly_data":[{"month":1,"data":[{"measure":"prec","value":0},{"measure":"sol_rad","value":16.76830703981461},{"measure":"t_max","value":22.95067688726611},{"measure":"t_min","value":8.262169576460318}]},{"month":2,"data":[{"measure":"prec","value":0},{"measure":"sol_rad","value":19.10055041313171},{"measure":"t_max","value":24.906782695225314},{"measure":"t_min","value":9.610066771507267}]},{"month":3,"data":[{"measure":"prec","value":0.468675434589386},{"measure":"sol_rad","value":20.570391962605132},{"measure":"t_max","value":26.766868529781235},{"measure":"t_min","value":11.773119711106833}]}]},{"weather_station":"5ebad1b04c06b707e80d619d","name":"avg","year":2023,"monthly_data":[{"month":1,"data":[{"measure":"prec","value":2.561159388720989},{"measure":"sol_rad","value":18.383354453732892},{"measure":"t_max","value":27.5326265033599},{"measure":"t_min","value":10.68272129997131}]},{"month":2,"data":[{"measure":"prec","value":2.214151189103723},{"measure":"sol_rad","value":22.149232064996447},{"measure":"t_max","value":29.167219016211384},{"measure":"t_min","value":12.318589288847797}]},{"month":3,"data":[{"measure":"prec","value":10.529810883402822},{"measure":"sol_rad","value":23.271344429754443},{"measure":"t_max","value":29.450426256733564},{"measure":"t_min","value":13.848978022144697}]}]}]}')    
    const reportInput = useSelector((state) => state.report);
    //console.log(reportInput);
    
    const [map_init, setMap_init] = React.useState({ center: [9.3988271, 39.9405962], zoom: 5 });
    const [bounds, setBounds] = React.useState([ [10, 30],  [8.5, 50],])
    const [opt_forecast, setOptForecast] = React.useState([{ label: "2022-07", value: "2022-07" }]);
    const [forecast, setForecast] = React.useState(opt_forecast[0].value);
    const [opt_crops, setOptCrops] = React.useState([{ label: "Wheat", value: "wheat" }]);
    const [opt_scenarios, setOptScenarios] = React.useState([{ label: "Normal", value: "normal" }, { label: "Above", value: "above" }, { label: "Below", value: "below" }]);
    const [crop, setCrop] = React.useState(opt_crops[0].value);
    const [scenario, setScenario] = React.useState(opt_scenarios[0].value);
    const [geoJson, setGeoJson] = React.useState();
    const [barChartData, setBarChartData] = React.useState();
    const [risk, setRisk] = React.useState()

    React.useEffect(() => {

        if (reportInput.kebele) {
            GeoFeatures.geojson("'" + reportInput.kebele[1] + "'").then((data_geo) => {
                const extent = bbox(data_geo);
                setBounds([[extent[1], extent[0]], [extent[3], extent[2]]])
                setGeoJson(data_geo)
            });

            axios.get(Configuration.get_url_api_base() + "metrics/" + reportInput.kebele[0])
                .then(response => {

                    setBarChartData(response.data);

                });

            axios.get(Configuration.get_url_api_base() + "risk/" + reportInput.kebele[0])
                .then(response => {
                    console.log("risk", response.data)
                    setRisk(response?.data[0]?.risk?.values[0])
                });

        }

    }, []);

    const changeForecast = event => {
        //console.log(event.value);
        setForecast(event.value);
    };

    // Generate the pdf based on a component
    const createPDF = async () => {
        let orientacion
        if (window.screen.width < 1400){
            //console.log("Pequeña")
            orientacion = 'p' 
        }else {
            //console.log("Grande")
            orientacion = 'l'
        }

        let html = document.querySelector('#report')
        let report = new JsPDF(orientacion,'px',[html.offsetWidth+40,html.offsetHeight+40]);
        const canvas = await html2canvas(html,{
            useCORS: true,
            scale: 1,
            allowTaint: true,
        })
        const img = canvas.toDataURL("image/png");
        report.addImage(img,'JPEG',10,10, html.offsetWidth, html.offsetHeight);
        report.save('report.pdf');
      };
    
    const ForecastSelect = () => (
        <div className='d-flex justify-content-end font-link-body'>
            <h5 className='p-2 bd-highlight mt-2'>Forecast date</h5>
            <div className='p-2 bd-highlight col-3'>
                <Select defaultValue={opt_forecast[0]} options={opt_forecast} onChange={changeForecast}/>

            </div>

        </div>
    )

    const Location = () => {
        
        return(
            <div className="card col">
                <div className="card-body">
                    <h5 className="card-title">Location</h5>
                    
            
                        {
                            geoJson && <Map id="location_report" init={map_init} type={"location_report"} geo={geoJson} style={{height: '40vh'}} bounds={bounds}/>
                        }
                    
                    
                    
                   
                </div>
            </div>
            

        )

    }

    const NutrientsAndYield = () => {
        return(
            <div className='col ms-3 me-3' style={{backgroundColor: "white"}} key="nutrientsAndYieldMap">
                    <h4 className='font-link'>Nutrients and yield</h4>
                    <Map id="map_nutrients_yield" init={map_init} type={"nutrients_yield"} crop={crop} forecast={forecast} 
                                        scenario={scenario} style={{height: '40vh'}} />
            </div>

        )

    }

    const SeasonalDominant = () => {
        return(
            <div className='col ms-3 me-3' style={{backgroundColor: "white"}} key="dominantMap">
                    <h4 className='font-link'>Seasonal dominant</h4>
                    <Map id="location_report" init={map_init} type={"seasonal_dominant"} style={{height: '40vh'}} checked={true} legend={true}/>
            </div>

        )

    }

    const SeasonalChartCarousel = () => {
        return(
            <div className="card col mt-3 me-3" key="donutCarousel">
                <div className="card-body">
                <h5 className="card-title">Seasonal</h5>

                   
                    <Carousel variant="dark">
                                
                        {
                    
                                donutChartData.climate[0].data.map((value, i) => (
                                    <Carousel.Item key={i}>
                                        <DonutChart data={value}/>
                                    </Carousel.Item>

                                
                                ))
                        }

                    </Carousel>
                </div>
                       

                        
            </div>

        )
    }

    const BarChartFert = ({name,data}) => {
        return(
                <div className='card col ms-2' key={"bar_chart_"+name}>
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <ColumnChart data={data} type={'fertilizer_rate'}/>

                    </div>
                            
                </div>

        )
    }

    const BarChartYield = ({name,data}) => {
        return(
                <div className='card col mt-3' key={"bar_chart_yield"}>
                    <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                        <ColumnChart data={data} type={'optimal_yield'}/>

                    </div>
                            
                </div>

        )
    }

    const Spinners = () => {
        return(
                <div className='col-12 d-flex justify-content-evenly' style={{backgroundColor: "white"}} key={"spinners"}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-border text-success" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-border text-warning" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>

        )
    }

    return(
        <main>
            <br />
            <section className='container'>
                <div className="d-flex justify-content-between font-link">
                    <h3>kebele report: <b>{reportInput.kebele[1]}</b></h3>
                </div>
                <div className='row'>
                    <div className='col mt-2'>
                    
                        <button onClick={createPDF} type="button" className="btn btn-primary">Export</button> 
                    </div>
                    <div className='col'>
                        <ForecastSelect/>

                    </div>
                </div>
                

                {
                    barChartData 
                    ?
                    <div id='report'>

                    <div className='row mt-2'>
                       <Location/>
                       <BarChartFert name={"Fertilizer rate"} data={[barChartData[1], barChartData[3]]}/>
                       <BarChartFert name={"Fertilizer rate (ISFM)"} data={[barChartData[0], barChartData[4]]}/>
                       
                                
                    </div>

                    <div className='row'>
                        <SeasonalChartCarousel/>
                        <BarChartYield name={"Optimal yield"} data={[barChartData[2]]}/>
                        
                    </div>
                            {risk && <div className={`alert alert-${risk === "High risk" ? "danger" : "warning"} mt-4 text-center`} role="alert">
                                {`Risk: ${risk}`}
                            </div>}

                            <div className="alert alert-light my-3 border" role="alert">
                                <h5>Notes: </h5>
                                <ol>
                                    <li>This advisory is for agricultural land allotted to wheat in 2022 main crop season only.</li>
                                    <li>If there is no sufficient inorganic fertilizer supply, use half inorganic with half organic rates.</li>
                                </ol>
                            </div>
                    </div>
                    

                    : <Spinners/>
                                
                }
                
                
                
                    

                

            </section>
            
                

            
        </main>
    )

}

export default Report;