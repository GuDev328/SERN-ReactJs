import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './DoctorManage.scss'
import 'react-image-lightbox/style.css';
import { FormattedMessage } from 'react-intl';
import Header from '../../Header/Header';
import { connect } from 'react-redux';
import { userService } from '../../../services'
import { languages, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions'
import * as ReactDOM from 'react-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';

const mdParser = new MarkdownIt();
class DoctorManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            contentMarkdown: '',
            contentHTMLMarkdown: '',
            selectedOption: null,
            description: '',
            arrDoctors: [],
            markdownId: null,
            hasOldData: false,

            selectedPrice: null,
            selectedPayment: null,
            selectedProvince: null,
            selectedSpecialty: null,
            nameClinic: '',
            addressClinic: '',
            note: '',

            priceArr: [],
            paymentArr: [],
            provinceArr: [],
            arrSpecialty: []
        }
    }
    async componentDidMount() {
        this.props.getDoctorsStart()
        this.props.getPriceStart()
        this.props.getPaymentStart()
        this.props.getProvinceStart()
        let listSpecialty = await userService.getAllSpecialty()
        if (listSpecialty && listSpecialty.errCode === 0) {
            this.setState({
                arrSpecialty: this.arrSpecialtyToSelectOption(listSpecialty.data)
            })
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctors !== this.props.doctors) {
            let listDoctors = this.arrDoctorToSelectOption(this.props.doctors)
            this.setState({
                arrDoctors: listDoctors,
            })
        }
        if (prevProps.language !== this.props.language) {
            let listDoctors = this.arrDoctorToSelectOption(this.props.doctors)
            let listPrices = this.arrToSelectOption(this.props.prices)
            let listPayments = this.arrToSelectOption(this.props.payments)
            let listProvinces = this.arrToSelectOption(this.props.provinces)
            this.setState({
                arrDoctors: listDoctors,
                priceArr: listPrices,
                paymentArr: listPayments,
                provinceArr: listProvinces
            })
        }
        if (prevProps.prices !== this.props.prices) {
            let listPrices = this.arrToSelectOption(this.props.prices)
            this.setState({
                priceArr: listPrices
            })
        }
        if (prevProps.payments !== this.props.payments) {
            let listPayments = this.arrToSelectOption(this.props.payments)
            this.setState({
                paymentArr: listPayments
            })
        }
        if (prevProps.provinces !== this.props.provinces) {
            let listProvinces = this.arrToSelectOption(this.props.provinces)
            this.setState({
                provinceArr: listProvinces
            })
        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTMLMarkdown: html
        });
    }
    handleChange = async (selectedOption) => {
        this.setState({ selectedOption });
        let detailDoctor = await userService.getDetailDoctor(selectedOption.value)
        if (detailDoctor && detailDoctor.errCode == 0 && detailDoctor.data && detailDoctor.data.DoctorInfo
            && detailDoctor.data.DoctorInfo.id) {
            let doctorInfo = detailDoctor.data.DoctorInfo
            this.setState({
                nameClinic: doctorInfo.nameClinic,
                addressClinic: doctorInfo.nameClinic,
                note: doctorInfo.note,
                selectedSpecialty: this.state.arrSpecialty.find((item, index) => {
                    return item.value == doctorInfo.specialtyId
                }),
                selectedPrice: this.state.priceArr.find((item, index) => {
                    return item.value == doctorInfo.priceId
                }),
                selectedPayment: this.state.paymentArr.find((item, index) => {
                    return item.value == doctorInfo.paymentId
                }),
                selectedProvince: this.state.provinceArr.find((item, index) => {
                    return item.value == doctorInfo.provinceId
                }),
            })
        } else {
            this.setState({
                nameClinic: '',
                addressClinic: '',
                note: '',
                selectedPrice: null,
                selectedSpecialty: null,
                selectedPayment: null,
                selectedProvince: null,
            })
        }
        if (detailDoctor && detailDoctor.errCode == 0 && detailDoctor.data && detailDoctor.data.DoctorInfo && detailDoctor.data.Markdown && detailDoctor.data.Markdown.id) {
            let markdown = detailDoctor.data.Markdown
            this.setState({
                markdownId: markdown.id,
                contentMarkdown: markdown.contentMarkdown,
                contentHTMLMarkdown: markdown.contentHTML,
                description: markdown.description,

                hasOldData: true
            })
        } else {
            this.setState({
                markdownId: null,
                contentMarkdown: '',
                contentHTMLMarkdown: '',
                description: '',

                hasOldData: false
            })
        }
        console.log(this.state.hasOldData)
    };
    handleOnChangeDecs = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    handleOnChangeDecs = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    handleChangePrice = (selectedPrice) => {
        this.setState({ selectedPrice })
    }
    handleChangePayment = (selectedPayment) => {
        this.setState({ selectedPayment })
    }
    handleChangeProvince = (selectedProvince) => {
        this.setState({ selectedProvince })
    }
    handleChangeSpecialty = (selectedSpecialty) => {
        this.setState({ selectedSpecialty })
    }
    validationInfo = () => {
        if (!this.state.contentHTMLMarkdown ||
            !this.state.contentMarkdown ||
            !this.state.description ||
            !this.state.selectedOption ||
            !this.state.selectedPrice ||
            !this.state.selectedSpecialty ||
            !this.state.selectedPayment ||
            !this.state.selectedProvince ||
            !this.state.note ||
            !this.state.nameClinic ||
            !this.state.addressClinic) {
            return false
        } else {
            return true
        }
    }
    handleOnClickSaveChange = () => {
        if (!this.validationInfo()) {
            alert("Please input param!")
            return
        }
        this.props.saveInfoDoctor({
            markdownId: this.state.markdownId,
            contentMarkdown: this.state.contentMarkdown,
            contentHTML: this.state.contentHTMLMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            priceId: this.state.selectedPrice.value,
            provinceId: this.state.selectedProvince.value,
            paymentId: this.state.selectedPayment.value,
            nameClinic: this.state.nameClinic,
            specialtyId: this.state.selectedSpecialty.value,
            addressClinic: this.state.addressClinic,
            note: this.state.note
        })
        this.setState({
            contentMarkdown: '',
            contentHTMLMarkdown: '',
            description: '',
            selectedOption: null,
            selectedPrice: null,
            selectedPayment: null,
            selectedSpecialty: null,
            selectedProvince: null,
            note: '',
            nameClinic: '',
            addressClinic: ''
        })
        alert("Saved Info Doctor")
    }
    arrSpecialtyToSelectOption = (arr) => {
        let options = []
        let { language } = this.props
        if (arr && arr.length > 0) {
            arr.map((item, index) => {
                let object = {}
                object.label = item.name
                object.value = item.id
                options.push(object)
            })
        }
        return options
    }
    arrToSelectOption = (arr) => {
        let options = []
        let { language } = this.props
        if (arr && arr.length > 0) {
            arr.map((item, index) => {
                let object = {}
                object.label = language == 'vi' ? item.valueVi : item.valueEn
                object.value = item.keyMap
                options.push(object)
            })
        }
        return options
    }
    arrDoctorToSelectOption = (arrDoctors) => {
        let options = []
        let { language } = this.props
        if (arrDoctors && arrDoctors.length > 0) {
            arrDoctors.map((item, index) => {
                let object = {}
                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = `${item.firstName} ${item.lastName}`
                object.label = language == 'vi' ? labelVi : labelEn
                object.value = item.id
                options.push(object)
            })
        }
        return options
    }
    handleChangeAddressClinic = (event) => {
        this.setState({
            addressClinic: event.target.value
        })
    }
    handleChangeNameClinic = (event) => {
        this.setState({
            nameClinic: event.target.value
        })
    }
    handleChangeNote = (event) => {
        this.setState({
            note: event.target.value
        })
    }
    render() {
        return (
            <div className='manage-doctor-container'>
                <Header />
                <div className='title'>Manage Doctor</div>
                <div className='select-texarea'>
                    <div className='select-doctor'>
                        <p className='title-choose-doctor'>Chọn bác sĩ</p>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={this.state.arrDoctors}
                        />
                        <p className='mt-3 mb-0'>Chuyên khoa:</p>
                        <Select
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeSpecialty}
                            options={this.state.arrSpecialty}
                        />
                    </div>
                    <div className='textarea'>
                        <p className='intro-doctor'>Thông tin giới thiệu</p>
                        <textarea rows='4' className='textarea-doctor form-control'
                            onChange={(event) => this.handleOnChangeDecs(event)}
                            value={this.state.description}></textarea>
                    </div>

                </div>

                <div className='select-info'>
                    <div className='price'>
                        <div>Giá: </div>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangePrice}
                            options={this.state.priceArr}
                        />
                    </div>
                    <div className='payment'>
                        <div>Phương thức thanh toán</div>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangePayment}
                            options={this.state.paymentArr}
                        />
                    </div>
                    <div className='province'>
                        <div>Tỉnh thành: </div>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeProvince}
                            options={this.state.provinceArr}
                        />
                    </div>
                </div>

                <div className='add-info'>
                    <div className='name-clinic'>
                        <div>Tên phòng khám: </div>
                        <input type='text' className='form-control'
                            value={this.state.nameClinic}
                            onChange={(event) => this.handleChangeNameClinic(event)} />
                    </div>
                    <div className='address-clinic'>
                        <div>Địa chỉ phòng khám: </div>
                        <input type='text' className='form-control'
                            value={this.state.addressClinic}
                            onChange={(event) => this.handleChangeAddressClinic(event)} />
                    </div>
                    <div className='note'>
                        <div>Note: </div>
                        <input type='text' className='form-control'
                            value={this.state.note}
                            onChange={(event) => this.handleChangeNote(event)} />

                    </div>
                </div>


                <MdEditor style={{ height: '500px', marginTop: '100px' }}
                    renderHTML={text => mdParser.render(text)}
                    onChange={this.handleEditorChange}
                    value={this.state.contentMarkdown} />
                <Button style={{ marginLeft: '50px', marginTop: '20px', backgroundColor: 'rgb(0 115 186)' }}
                    onClick={() => this.handleOnClickSaveChange()}
                >Save Change</Button>
            </div >
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        doctors: state.admin.doctors,
        prices: state.admin.prices,
        payments: state.admin.payments,
        provinces: state.admin.provinces,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveInfoDoctor: (data) => dispatch(actions.saveInfoDoctorStart(data)),
        getDoctorsStart: () => dispatch(actions.fetchAllDoctorsStart()),
        getPriceStart: () => dispatch(actions.fetchPriceStart()),
        getPaymentStart: () => dispatch(actions.fetchPaymentStart()),
        getProvinceStart: () => dispatch(actions.fetchProvinceStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage);
