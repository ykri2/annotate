import React from 'react';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import TextInputComponent from '../../HelperComponents/TextInputComponent';

/** 
 * Overview component 
 * 
 **/

class OverviewComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            goto_index: undefined,
        }
        

    }

    render() {

        const properties = this.props.properties;
        let mostused, mostusedtypes, mostAnnotatedImage;

        if(properties.annotations.length > 0) {
            mostAnnotatedImage = this.mostAnnotatedImage(properties.annotations, properties.files)       
            mostused = this.produceMostUsed(properties.annotations)
            mostusedtypes = this.produceMostUsedTypes(properties.annotations)

        }
   

        return (
            <div className='overview'>

            <div className="overview_row">

                <div className="overview_card">
                    <div className="overview_inner_wrapper">
                    <span className="title"> ANNOTATED FILES / ALL FILES</span>
                        <div className="overview_content">
                            <div className="overview_one">
                                    { 
                                        properties.annotations.length > 0 
                                        ? 
                                        <p className="overview_upper_p">{properties.annotations.length}</p>   
                                        : 
                                        <p className="overview_no_p">no current annotations available</p> 
                                    } 
                            </div>
                            <div className="overview_two">
                                    { properties.files.length > 0 
                                        ? 
                                        <p className="overview_lower_p">{properties.files.length}</p>  
                                        : 
                                        <p className="overview_no_p">no current image available</p> 
                                    } 
                            </div>
                        </div>
                    </div>
                </div>
                <div className="overview_card">
                    <div className="overview_inner_wrapper">
                    <span className="title"> CURRENT IMAGE FILE </span>
                        <div className="overview_content">
                            <div className="overview_current_index">
                              <div className="overview_one">
                                    { 
                                        properties.currentFile !== undefined
                                        ? 
                                        <p className="overview_current_index_p">{properties.currentFile}</p>   
                                        : 
                                        <p className="overview_no_p">no current annotations available</p> 
                                    } 
                            </div>
                            <div className="overview_two">
                                    { properties.currentFile !== undefined 
                                        ? 
                                        <div className="overview_move_current_index" >
                                            <TextInputComponent 
                                                field={'goto_index'} 
                                                value={this.state.goto_index} 
                                                label={'MOVE INDEX'}
                                                error={undefined} 
                                                onChange={() => {
                                                    console.log('[+] on change')
                                                    console.log(properties.files.length - 1)
                                                }}
                                                max_length={properties.files.length - 1}
                                                type={'number'}  
                                            />
                                            <button className={ "overview_goto_btn" } onClick={()=>{console.log("[+] goto btn")}} ><p className="goto_btn_p" >GO</p></button>
                                        </div>
                                        : 
                                        <p className="overview_no_p">no current image available</p> 
                                    } 
                            </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="overview_card">
                    <div className="overview_inner_wrapper">
                    <span className="title"> CONCEPTS / CONCEPT TYPES </span>
                        <div className="overview_content">
                            <div className="overview_one">
                                    { 
                                        properties.concepts.length > 0
                                        ?
                                        <p className="overview_upper_p">{ properties.concepts.length }</p> 
                                        :
                                        <p className="overview_no_p">no concepts available</p> 
                                    } 
                            </div>
                            <div className="overview_two">
                                { properties.concept_types.length > 0
                                    ?
                                    <p className="overview_lower_p">{ properties.concept_types.length }</p> 
                                    :   
                                    <p className="overview_no_p">no concept types available</p> 
                                } 
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="overview_row">
                <div className="overview_card">
                    <div className="overview_inner_wrapper">
                    <span className="title"> MOST FREQUENT CONCEPTS </span>
                        { mostused !== false && mostused !== undefined
                        ?
                        <div className="overview_content">
                        <div className="overview_one">
                                <p className="overview_upper_p">{mostused.max_nr}</p> 
                            </div>
                            <div className="overview_words_two">
                                {
                                mostused.all_words.map((concept) => { return<p className="overview_words_lower_p">{concept}</p>} ) 
                                } 
                            </div>
                        </div>
                        :
                        <div className="overview_content">
                            <div className="overview_one">
                                <p className="overview_no_p">no current index available</p> 
                            </div>
                        </div>
                        }
                    </div>
                </div>
                <div className="overview_card">
                    <div className="overview_inner_wrapper">
                    <span className="title"> MOST ANNOTATED IMAGE </span>
                    <span className="undertitle"> TOTAL NR / IDS </span>
                        { mostAnnotatedImage !== false && mostAnnotatedImage !== undefined
                        ?
                        <div className="overview_content">
                        <div className="overview_max_image_one">
                                <p className="overview_index_p">{mostAnnotatedImage.max_length}</p> 
                            </div>
                            <div className="overview_max_image_two">
                                {
                                mostAnnotatedImage.all_indexs.map((index) => { return<p className="overview_index_p">{index}</p>} ) 
                                } 
                            </div>
                        </div>
                        :
                        <div className="overview_content">
                            <div className="overview_one">
                                <p className="overview_no_p">no current index available</p> 
                            </div>
                        </div>
                        }
                    </div>
                </div>
                <div className="overview_card">
                    <div className="overview_inner_wrapper">
                    <span className="title"> MOST FREQUENT TYPES </span>
                    { mostusedtypes !== false && mostusedtypes !== undefined
                        ?
                        <div className="overview_content">
                        <div className="overview_one">
                                <p className="overview_upper_p">{mostusedtypes.max_nr}</p> 
                            </div>
                            <div className="overview_words_two">
                                {
                                mostusedtypes.all_words.map((concept) => { return<p className="overview_words_lower_p">{concept}</p>} ) 
                                } 
                            </div>
                        </div>
                        :
                        <div className="overview_content">
                            <div className="overview_one">
                                <p className="overview_no_p">no current index available</p> 
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>

            </div>
        )
    }

    /** return word frequency */
    countFrequency(array) {
        return array.reduce(function(count, word) {
            count[word] = count.hasOwnProperty(word) ? count[word] + 1 : 1;
            
            return count;
        }, {})
    }

    /** return most used concepts used among images */
    produceMostUsed(objects) {
        try {

            let array = [];
            objects.forEach(object => {
                object.areas.forEach(innerObject => {
                    array = [...array, ...innerObject.shape_properties.what]
                })
            });

            const mostused = this.highestObjectProperty(this.countFrequency(array));
            if(mostused.max_nr === -Infinity) {
                mostused = undefined
            }
            return mostused
        } catch (e) {
            console.log(e)

            return false
        }
    }

    /** returns the dict key with the heighest counter (list of words with the heighest frequency) */
    highestObjectProperty(input) {
        let curr = [], min = Infinity, max = -Infinity, counter = 0, x;
        for( x in input) {
          
            if( input[x] < min) { min = input[x]; }
            if( input[x] === max) { curr.push(Object.keys(input)[counter]); }
            if( input[x] > max) { max = input[x]; curr = []; curr.push(Object.keys(input)[counter]); }
            counter++;
        }
        return { max_nr: max, all_words: curr }
    }

    /** returns the most frequent type in image annoations */
    produceMostUsedTypes(objects) {
        try {
            let array = [];
            objects.forEach(object => {
                object.areas.forEach(innerObject => {
                    array = [...array, ...innerObject.shape_properties.type]
                })
            });

            let mostused = this.highestObjectProperty(this.countFrequency(array));
            if(mostused.max_nr === -Infinity) {
                mostused = undefined
            }
            return mostused
        } catch (e) {
            console.log(e)

            return false
        }
    }

    /** returns ids of images with the most annotations */
    findMostAnnotatedId(annotations) {
        let ids = [], counter = 0, x, max = -Infinity;
        for(x in annotations) {
            if( annotations[x].areas.length === max) { ids.push(annotations[x].local_id); }
            if( annotations[x].areas.length > max) { max = annotations[x].areas.length; ids = []; ids.push(ids.push(annotations[x].local_id)); }
            counter++;
        }
        return { max_length: max, all_ids: ids }
    }

    /** returns index of an image */
    findImagesById(mostanno, images) {
        return { max_length: mostanno.max_length, all_indexs: mostanno.all_ids.map((id) => {
            let img;
            for(img in images) {
 
                if(id === images[img].local_id) {
                    return images[img].index;
                }
            }
       
        }) }
    }

    /** returns most annotated image */
    mostAnnotatedImage(annotations, images) {
        try {
            let mostanno = this.findMostAnnotatedId(annotations)
  
            return this.findImagesById(mostanno, images)
        } catch (e) {

            console.log(e)
            return false
        }
    }

}

/** wrap global state to local component **/
function mapStateToProps(state, props) {
    return {
     
        
    };
}

/** map functions to props **/
const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(OverviewComponent);