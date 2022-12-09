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

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];
const mdParser = new MarkdownIt();
class DoctorManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            contenMarkdown: '',
            contentHTMLMarkdown: '',
            selectedOption: null,
            description: ''
        }
    }
    async componentDidMount() {

    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contenMarkdown: text,
            contentHTMLMarkdown: html
        });
    }
    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
    };
    handleOnChangeDecs = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    handleOnClickSaveChange = () => {
        console.log(this.state)
    }
    render() {
        //const { selectedOption } = this.state;
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
                            options={options}
                        />
                    </div>
                    <div className='textarea'>
                        <p className='intro-doctor'>Thông tin giới thiệu</p>
                        <textarea rows='5' className='textarea-doctor form-control'
                            onChange={(event) => this.handleOnChangeDecs(event)}
                            value={this.state.description}></textarea>
                    </div>

                </div>
                <MdEditor style={{ height: '500px', marginTop: '100px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange} />
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage);
