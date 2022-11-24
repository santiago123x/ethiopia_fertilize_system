import React from 'react';
import axios from "axios";

import './Home.css';
import landscape from '../../assets/images/landscape.jpg';
import soil_climate_specific from '../../assets/images/soil_climate_specific.jpg';
import season_specific from '../../assets/images/season_specific.jpg';
import segmentation from '../../assets/images/segmentation.jpg';
import Map from '../../components/map/Map';
import Configuration from "../../conf/Configuration";

import { setReportInput } from '../../slices/reportSlice';

import { useState } from 'react';

//redux
import {useDispatch} from 'react-redux';
import { current } from '@reduxjs/toolkit';

function Home() {
    const [map_init, setMap_init] = React.useState({ center: [9.3988271, 39.9405962], zoom: 5 });
    const [selectsValues, setSelectsValues] = React.useState();
    const [disabledSelect, setDisabledSelect] = React.useState(true);

    const [formValues, setFormValues] = useState({
        type: null,
        region: null,
        zone: null,
        woreda: null,
        kebele: null,
        ad_fertilizer: null,
        ad_aclimate: null,
        ad_isfm: null
  
      });

    const dispatch = useDispatch();

    React.useEffect(() => {
        //Regions
        if(!selectsValues){
            axios.get(Configuration.get_url_api_base()+"adm1")
                .then(response => {
                    setSelectsValues({... selectsValues, regions: response.data})
                    
                    
                });

        }
        if(formValues.region){
            //Zones
            axios.get(Configuration.get_url_api_base()+"adm2/"+formValues.region[0])
                .then(response => {
                    console.log(response);
                    setSelectsValues({... selectsValues, zones: response.data})
                    console.log(selectsValues);
                    
                });

        }
        
        if(formValues.zone){
            //Woredas
            axios.get(Configuration.get_url_api_base()+"adm3/"+formValues.zone[0])
                .then(response => {
                    console.log(response);
                    setSelectsValues({... selectsValues, woredas: response.data})
                    console.log(selectsValues);
                    
                });

        }

        if(formValues.woreda){
            //Kebeles
            axios.get(Configuration.get_url_api_base()+"adm4/"+formValues.woreda[0])
                .then(response => {
                    console.log(response);
                    setSelectsValues({... selectsValues, kebeles: response.data})
                    console.log(selectsValues);
                    
                });

        }


    }, [formValues]);

    const onFormSubmit = (e) =>{
        e.preventDefault();
        dispatch(setReportInput({formValues}));

    }



    return (
        <main>
            <br/>
            <br/>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        
                                    <h1 className='font-link text-center'><b>NextGen Agroadvisory</b></h1>
                                    <p className='font-link-body text-center'>
                                        NextGenAgroadvisory is a project designed to develop location-, context-, and climate- specific agricultural
                                        advisories particularly related to optimal fertilizer application, integrated soil fertility management (ISFM),
                                        climate information service, climate smart agricultural activities (CSA), pest and disease surveillance, and other
                                        agricultural investments in Ethiopia. It is a project by the Alliance of Bioversity International and the International
                                        Center for Tropical Agriculture (CIAT) in partnership with support of SSHI (BMGF), EiA (oneCGIAR initiative),
                                        AICCRA (World Bank), and SI-MFS (oneCGIAR initiative).
                                    </p>

                        
                                
                    </div>

                </div>
                
                <div className='row row-content mt-5 font-link-body'>
                    <form className='col-6' onSubmit={onFormSubmit}>
                        <p>Choose a location</p>
                        <div className='row form-group'>
                            <div className='col-6'>
                                <b>Region</b>
                                <select className="form-select" aria-label="Disabled select example" onChange={e =>{setDisabledSelect(false); setFormValues({ ...formValues, region: e.target.value.split(",") })} }>
                                    <option key={"region default"} value={null}>Select a region</option>
                               
                                    {
                                        selectsValues?.regions && selectsValues?.regions.map((currentRegion) => <option key={currentRegion.id} value={[currentRegion.id, currentRegion.name]}>{currentRegion.name}</option>)
                                    }
                                </select>

                            </div>
                            <div className='col-6'>
                                <b>Zone</b>
                                <select className="form-select" aria-label="Disabled select example" disabled={disabledSelect} onChange={e => setFormValues({ ...formValues, zone: e.target.value.split(",") })}>
                                   
                                    <option key={"zone default"} value={null}>Select a zone</option>
                               
                                    {
                                        selectsValues?.zones && selectsValues?.zones.map((currentZone) => <option key={currentZone.id} value={[currentZone.id, currentZone.name]}>{currentZone.name}</option>)
                                    }
                                </select>

                            </div>
                            <div className='col-6 mt-4'>
                                <b>Woreda</b>
                                <select className="form-select" aria-label="Disabled select example" disabled={disabledSelect} onChange={e => setFormValues({ ...formValues, woreda: e.target.value.split(",") })}>
                                   
                                    <option key={"woreda default"} value={null}>Select a zone</option>
                               
                                    {
                                        selectsValues?.woredas && selectsValues?.woredas.map((currentWoreda) => <option key={currentWoreda.id} value={[currentWoreda.id, currentWoreda.name]}>{currentWoreda.name}</option>)
                                    }
                                </select>

                            </div>
                            <div className='col-6 mt-4'>
                                <b>Kebele</b>
                                <select className="form-select" aria-label="Disabled select example" disabled={disabledSelect} onChange={e => setFormValues({ ...formValues, kebele: e.target.value.split(",") })}>
                                   
                                    <option key={"zone default"} value={null}>Select a zone</option>
                               
                                    {
                                        selectsValues?.kebeles && selectsValues?.kebeles.map((currentKebele) => <option key={currentKebele.id} value={[currentKebele.id, currentKebele.name]}>{currentKebele.name}</option>)
                                    }
                                </select>

                            </div>

                            <div className="row form-check mt-4">
                                <div className='col 12'>
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={e => setFormValues({ ...formValues, ad_fertilizer: e.target.checked })}/>
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        Advisory Fertilizer
                                    </label>

                                </div>
                            </div>
                            <div className="row form-check">
                                <div className='col 12'>
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={e => setFormValues({ ...formValues, ad_aclimate: e.target.checked })}/>
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        Advisory Aclimate
                                    </label>

                                </div>
                            </div>
                            <div className="row form-check">
                                <div className='col 12'>
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={e => setFormValues({ ...formValues, ad_isfm: e.target.checked })}/>
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        Advisory ISFM
                                    </label>

                                </div>
                            </div>

                        </div>



                        <div className='row'>
                            <div className='col d-flex justify-content-center mt-4 mb-4'>
                            <button type="submit" className="btn btn-primary">Advisory</button>
                            
                            </div>

                        </div>
                    </form>
                    <div className='col-6'>
                        <Map id="location_report" init={map_init} type={"location_report"} style={{ height: '300px' }}/>

                    </div>

                    


                </div>

            </div>
            
            {
                /* 
                <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" aria-label="Slide 1" className="active" aria-current="true"></button>
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2" className=""></button>
                </div>
                <div className="carousel-inner">

                    <div className="carousel-item">
                        <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777"></rect></svg>
                        <div className="container">
                            <div className="carousel-caption text-start">
                                <h1>Coalition of the Willing</h1>
                                <p>Powering data-driven solutions for Ethiopian agriculture (cgiar.org)</p>
                                <p></p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
                */
            }
           
        
           
        </main>
    );
}

export default Home;