import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailDoctor.scss'
import * as actions from '../../../store/actions'
import FooterHome from '../../HomePage/FooterHome';
import { languages, CommonUtils } from '../../../utils';
import { FormattedMessage } from 'react-intl'
import { withRouter } from 'react-router';
import DoctorSchedule from './DoctorSchedule';

class DetailDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            avt: '',

        }
    }

    async componentDidMount() {
        window.scrollTo({ top: 0, left: 0 })
        this.props.getDetailDoctor(this.props.match.params.id)
    }

    render() {
        let detailDoctor = this.props.detailDoctor
        let titleDoctor = 'loading...'
        let descriptionDoctor = 'loading...'
        let contentHTML = 'loading...'
        if (detailDoctor.positionData) {
            if (this.props.language === 'vi') {
                titleDoctor = detailDoctor.positionData.valueVi + ' ' +
                    detailDoctor.lastName + ' ' +
                    detailDoctor.firstName
            } else {
                titleDoctor = detailDoctor.positionData.valueEn + ' ' +
                    detailDoctor.firstName + ' ' +
                    detailDoctor.lastName
            }
        }
        if (detailDoctor.Markdown) {
            descriptionDoctor = detailDoctor.Markdown.description
            contentHTML = detailDoctor.Markdown.contentHTML
        }
        return (

            < div >
                <div className='header'>
                    <div className='header-left' onClick={() => this.props.history.goBack()}><i className="arrow-back fa fa-arrow-left"></i></div>
                    <div className='header-right'>
                        <div className='support'><i class="fa fa-question-circle"></i></div>
                        <div className='menu'><i class="fa fa-bars"></i></div>
                    </div>
                </div>
                <div className='infoDoctor'>
                    <div className='avt'>
                        <img className='img-cus' src={detailDoctor.image} />
                    </div>
                    <div className='doctor-content'>
                        <div className='title-doctor'>
                            {titleDoctor}
                        </div>
                        <div className='description'>
                            {descriptionDoctor}
                        </div>
                    </div>
                </div>
                <div className='doctor-schedule'>
                    <div className='doctor-schedule-left'>
                        <DoctorSchedule doctorId={this.props.match.params.id} />
                    </div>
                    <div className='doctor-schedule-right'>

                    </div>
                </div>

                <div className='detail' dangerouslySetInnerHTML={{ __html: `${contentHTML}` }} />;
                <FooterHome />
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        detailDoctor: state.admin.detailDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDetailDoctor: (doctorId) => dispatch(actions.fetchDetailDoctorsStart(doctorId)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailDoctor));
