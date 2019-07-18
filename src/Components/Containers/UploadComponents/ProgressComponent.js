import React from 'react';


/** 
 * ProgressBar component
 * 
 **/

class ProgressComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {

        }


    }



    render() {
        return (
            <div className='progress_component'>
                <div 
                    className="progress_div"
                    style={{
                        width: this.props.progress + '%',
                    }}
                />
            
            </div>
        )
    }
}

export default ProgressComponent;