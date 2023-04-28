import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './SpecialtyManage.scss'
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
class SpecialtyManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            arrSpecialty: [],
            specialtyId: null,
            createNew: '',

            image: '',
            avtPrev: '',
            isOpen: false,
            isChangeImage: false
        }
    }
    async componentDidMount() {
        let listSpecialty = await userService.getAllSpecialty()
        console.log(listSpecialty)
        if (listSpecialty && listSpecialty.errCode === 0) {
            this.setState({
                arrSpecialty: listSpecialty.data.reverse()
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
            this.setState({
                arrDoctors: listDoctors,
            })
        }
        if (prevProps.prices !== this.props.prices) {
            let listPrices = this.arrToSelectOption(this.props.prices)
            this.setState({
                priceArr: listPrices
            })
        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        });
    }

    validationInfo = () => {
        if (!this.state.contentHTML ||
            !this.state.contentMarkdown ||
            !this.state.specialtyId) {
            return false
        } else {
            return true
        }
    }
    handleOnClickSaveChange = async () => {
        if (!this.validationInfo()) {
            alert("Please input param!")
            return
        }
        let statusEdit = await userService.editSpecialty({
            id: this.state.specialtyId,
            name: this.state.createNew,
            image: this.state.image,
            contentMarkdown: this.state.contentMarkdown,
            contentHTML: this.state.contentHTML,
            isChangeImage: this.state.isChangeImage
        })
        let listSpecialty = await userService.getAllSpecialty()
        if (listSpecialty && listSpecialty.errCode === 0) {
            this.setState({
                arrSpecialty: listSpecialty.data.reverse()
            })
        }
        if (statusEdit.errCode === 0) {
            this.setState({
                contentMarkdown: '',
                contentHTML: '',
                specialtyId: null,
                createNew: '',

                image: '',
                avtPrev: '',
                isOpen: false,
                isChangeImage: false
            })
        }
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                avtPrev: objectUrl,
                image: base64,
                isChangeImage: true
            }, () => {
                console.log(this.state.avtPrev)
            })
        }
    }
    openPreviewAvt = () => {
        if (!this.state.avtPrev) return;
        this.setState({
            isOpen: true
        })
    }
    onChangeInputCreateNew = (event) => {
        this.setState({
            createNew: event.target.value
        })
    }
    handleOnClickCreateNewSpecialty = async () => {
        let response = await userService.createNewSpecialty({
            name: this.state.createNew
        })
        if (response.errCode === 0) {
            //alert('Create Sucessfully')
            let listSpecialty = await userService.getAllSpecialty()
            if (listSpecialty && listSpecialty.errCode === 0) {
                this.setState({
                    arrSpecialty: listSpecialty.data.reverse()
                })
            }
            this.setState({
                createNew: ''
            })
        }
    }
    handleDeleteSpecialty = async (specialty) => {
        if (window.confirm('Are you want delete ' + specialty.name)) {
            let statusDelete = await userService.deleteSpecialty(specialty.id)
            if (statusDelete && statusDelete === 0) alert("Deleted")
            let listSpecialty = await userService.getAllSpecialty()
            if (listSpecialty && listSpecialty.errCode === 0) {
                this.setState({
                    arrSpecialty: listSpecialty.data.reverse()
                })
            }
        }
    }
    handleEditSpecialty = (specialty) => {
        let imgBase64 = ''
        if (specialty.image) {
            imgBase64 = new Buffer(specialty.image, 'base64').toString('binary')
        }
        this.setState({
            createNew: specialty.name,
            contentMarkdown: specialty.contentMarkdown,
            contentHTML: specialty.contentHTML,
            specialtyId: specialty.id,
            image: '',
            avtPrev: imgBase64,
        })

    }
    render() {

        console.log(this.state.arrSpecialty)
        return (
            <div className='manage-doctor-container'>
                <Header />
                <div className='title'>Manage Specialty</div>
                <div className='specialty-containerr'>
                    <div className='list-specialty'>
                        <p className='title-list-specialty'>Danh sách chuyên khoa</p>
                        <div className='input-create'>
                            <input className='form-control input-create-new' type='text'
                                onChange={(event) => this.onChangeInputCreateNew(event)}
                                value={this.state.createNew} />
                            <span className='btn btn-create'
                                onClick={this.handleOnClickCreateNewSpecialty}>+</span>
                        </div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Tên chuyên khoa</th>
                                    <th scope="col">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.arrSpecialty && this.state.arrSpecialty.length > 0 &&
                                    this.state.arrSpecialty.map((item, index) => {
                                        return (<tr>
                                            <td>{item.name}</td>
                                            <td><i class=" icon-edit fas fa-edit" onClick={() => this.handleEditSpecialty(item)}></i>
                                                <i class="icon-delete fas fa-trash-alt" onClick={() => this.handleDeleteSpecialty(item)}></i></td>
                                        </tr>)

                                    })
                                }

                            </tbody>
                        </table>
                    </div>

                    <div className='right'>
                        <div className='image'>
                            <input type='file' id='upload_avt' hidden onChange={(event) => this.handleOnChangeImage(event)} className="form-control" />
                            <label className='upload-avt' htmlFor='upload_avt'><i className="fas fa-upload"></i>Tải lên</label>
                            <Button style={{ marginLeft: '400px', marginTop: '20px', backgroundColor: 'rgb(0 115 186)' }}
                                onClick={() => this.handleOnClickSaveChange()}
                            >Save Change</Button>
                        </div>
                        <div className='preview-avt'
                            style={{ backgroundImage: `url(${this.state.avtPrev})` }}
                            onClick={() => this.openPreviewAvt()}
                        ></div>

                        <MdEditor
                            style={{ width: '100%', height: '500px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.contentMarkdown} />

                    </div>
                </div>
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
        // getProvinceStart: () => dispatch(actions.fetchProvinceStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyManage);
