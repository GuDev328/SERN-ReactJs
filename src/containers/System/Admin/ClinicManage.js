import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './ClinicManage.scss'
import 'react-image-lightbox/style.css';
import { FormattedMessage } from 'react-intl';
import Header from '../../Header/Header';
import { connect } from 'react-redux';
import { userService } from '../../../services'
import { languages, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions'
import * as ReactDOM from 'react-dom';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';

const mdParser = new MarkdownIt();
class ClinicManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            addNew: '',
            contentMarkdown: '',
            contentHTMLMarkdown: '',
            selectedClinic: null,
            markdownId: null,
            hasOldData: false,
            nameClinic: '',
            addressClinic: '',
            avt: '',
            avtPrev: '',
            image: '',
            imagePrev: '',
            isOpenAvt: false,
            isOpenImage: false,
            isChangeImage: false,
            isChangeAvt: false,
            arrClinic: []
        }
    }
    async componentDidMount() {
        this.props.getClinicsStart()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.clinics !== this.props.clinics) {
            let listClinic = this.arrClinicToSelectOption(this.props.clinics)
            this.setState({
                arrClinic: listClinic,
            })
        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTMLMarkdown: html
        });
    }
    handleChangeClinic = (selectedClinic) => {
        let clinic = this.props.clinics.find((item, index) => {
            return item.id === selectedClinic.value
        })
        let imgBase64Avt = ''
        if (clinic.avt) {
            imgBase64Avt = new Buffer(clinic.avt, 'base64').toString('binary')
        }
        let imgBase64Img = ''
        if (clinic.avt) {
            imgBase64Img = new Buffer(clinic.image, 'base64').toString('binary')
        }
        this.setState({
            selectedClinic: selectedClinic,
            contentMarkdown: clinic.contentMarkdown,
            contentHTMLMarkdown: clinic.contentHTML,
            nameClinic: clinic.name,
            addressClinic: clinic.address,
            avtPrev: imgBase64Avt,
            imagePrev: imgBase64Img,
        });
    };

    handleChangeClinicName = (event) => {
        this.setState({ nameClinic: event.target.value });
    };

    handleChangeAddNewClinic = (event) => {
        this.setState({ addNew: event.target.value });
    };

    handleChangeClinicAddress = (event) => {
        this.setState({ addressClinic: event.target.value });
    };

    openPreviewAvt = () => {
        if (!this.state.avtPrev) return;
        this.setState({
            isOpenAvt: true
        })
    }
    openPreviewImg = () => {
        if (!this.state.imagePrev) return;
        this.setState({
            isOpenImage: true
        })
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                imagePrev: objectUrl,
                image: base64,
                isChangeImage: true
            })
        }
    }

    handleOnChangeAvt = async (event) => {
        let data = event.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                avtPrev: objectUrl,
                avt: base64,
                isChangeAvt: true
            })
        }
    }

    handleOnClickAddNewClinic = async () => {
        if (!this.state.addNew) {
            alert("Nhập tên phòng khám cần thêm!")
        } else {
            let status = await userService.createNewClinic({ name: this.state.addNew })
            if (status.errCode === 0) {
                alert("Thêm phòng khám thành công!")
                this.props.getClinicsStart()
                this.setState({
                    addNew: '',
                    contentMarkdown: '',
                    contentHTMLMarkdown: '',
                    selectedClinic: null,
                    nameClinic: '',
                    addressClinic: '',
                    avt: '',
                    avtPrev: '',
                    image: '',
                    imagePrev: '',
                    isOpenAvt: false,
                    isOpenImage: false,
                    isChangeImage: false,
                    isChangeAvt: false,
                })
            }
            else alert("Có lỗi khi thêm phòng khám, ErrCode: " + status.errCode)
        }
    }

    arrClinicToSelectOption = (arrClinic) => {
        let options = []
        if (arrClinic && arrClinic.length > 0) {
            arrClinic.map((item, index) => {
                let object = {}
                object.label = item.name
                object.value = item.id
                options.push(object)
            })
        }
        return options
    }

    handleOnClickSaveChange = async () => {
        let res = await userService.editClinic({
            id: this.state.selectedClinic.value,
            name: this.state.nameClinic,
            address: this.state.addressClinic,
            contentHTML: this.state.contentHTMLMarkdown,
            contentMarkdown: this.state.contentMarkdown,
            isChangeAvt: this.state.isChangeAvt,
            isChangeImage: this.state.isChangeImage,
            avt: this.state.avt,
            image: this.state.image
        })
        this.props.getClinicsStart()
        if (res.errCode === 0) {
            this.setState({
                addNew: '',
                contentMarkdown: '',
                contentHTMLMarkdown: '',
                selectedClinic: null,
                nameClinic: '',
                addressClinic: '',
                avt: '',
                avtPrev: '',
                image: '',
                imagePrev: '',
                isOpenAvt: false,
                isOpenImage: false,
                isChangeImage: false,
                isChangeAvt: false,
            })
        } else alert("Lưu thông tin cập nhật không thành công, lỗi " + res.errCode)
    }

    handleOnClickDeleteClinic = async () => {
        let confirmm = window.confirm("Bạn có muốn xoá phòng khám này?")
        if (confirmm) {
            let res = await userService.deleteClinic(this.state.selectedClinic.value)
            if (res.errCode === 0) {
                alert("Xoá thành công phòng khám!")
                this.props.getClinicsStart()
                this.setState({
                    addNew: '',
                    contentMarkdown: '',
                    contentHTMLMarkdown: '',
                    selectedClinic: null,
                    nameClinic: '',
                    addressClinic: '',
                    avt: '',
                    avtPrev: '',
                    image: '',
                    imagePrev: '',
                    isOpenAvt: false,
                    isOpenImage: false,
                    isChangeImage: false,
                    isChangeAvt: false,
                })
            } else alert("Có lỗi khi xoá, lỗi " + res.errCode)
        }
    }

    render() {
        return (
            <div className='manage-clinic-container'>
                <Header />
                <div className='title'>Manage Clinic</div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='add-clinic'>
                                <div className='btn-add-clinic btn btn-success'
                                    onClick={this.handleOnClickAddNewClinic}
                                >+</div>
                                <input type='text' value={this.state.addNew}
                                    onChange={(event) => this.handleChangeAddNewClinic(event)}
                                    className='form-control'></input>
                            </div>
                            <div>Chọn phòng khám</div>
                            <Select
                                value={this.state.selectedClinic}
                                onChange={this.handleChangeClinic}
                                options={this.state.arrClinic}
                            />

                            <div>Tên phòng khám</div>
                            <input type='text' value={this.state.nameClinic}
                                onChange={(event) => this.handleChangeClinicName(event)}
                                className='form-control'></input>

                            <div>Địa chỉ phòng khám</div>
                            <input type='text' value={this.state.addressClinic}
                                onChange={(event) => this.handleChangeClinicAddress(event)}
                                className='form-control'></input>
                            {this.state.selectedClinic &&
                                <div className='btn-delete-clinic btn btn-danger'
                                    onClick={this.handleOnClickDeleteClinic}
                                >Xoá phòng khám</div>
                            }
                            <Button style={{ margin: '10px', backgroundColor: 'rgb(0 115 186)' }}
                                onClick={() => this.handleOnClickSaveChange()}
                            >Save Change</Button>
                        </div>
                        <div className='col-md-6'>
                            <div className='preview-avt-container'>
                                <input type='file' id='upload_avt' hidden onChange={(event) => this.handleOnChangeAvt(event)} className="form-control" />
                                <label className='upload-avt' htmlFor='upload_avt'><i className="fas fa-upload"></i>Tải lên ảnh đại diện</label>
                                <div className='preview-avt'
                                    style={{ backgroundImage: `url(${this.state.avtPrev})` }}
                                    onClick={() => this.openPreviewAvt()}
                                ></div>
                            </div>
                            {this.state.isOpenAvt === true &&
                                <Lightbox
                                    mainSrc={this.state.avtPrev}
                                    onCloseRequest={() => this.setState({ isOpenAvt: false })}
                                />
                            }

                            <div className='preview-avt-container'>
                                <input type='file' id='upload_img' hidden onChange={(event) => this.handleOnChangeImage(event)} className="form-control" />
                                <label className='upload-avt' htmlFor='upload_img'><i className="fas fa-upload"></i>Tải lên ảnh bìa</label>
                                <div className='preview-avt'
                                    style={{ backgroundImage: `url(${this.state.imagePrev})` }}
                                    onClick={() => this.openPreviewImg()}
                                ></div>
                            </div>
                            {this.state.isOpenImage === true &&
                                <Lightbox
                                    mainSrc={this.state.imagePrev}
                                    onCloseRequest={() => this.setState({ isOpenImage: false })}
                                />
                            }
                        </div>
                    </div>
                </div>
                <MdEditor style={{ height: '500px', marginTop: '20px' }}
                    renderHTML={text => mdParser.render(text)}
                    onChange={this.handleEditorChange}
                    value={this.state.contentMarkdown} />

            </div >
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        clinics: state.admin.clinics,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getClinicsStart: () => dispatch(actions.fetchAllClinicsStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClinicManage);
