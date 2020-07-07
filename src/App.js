import React, { Component, Fragment } from 'react';
import Container from './Container';
import Footer from './Footer';
import './App.css';
import {
   getAllSimpsons,
   updateSimpsonCharacter,
   deleteSimpsonCharacter
} from './client';
import AddSimpsonForm from './forms/AddSimpsonForm';
import EditSimpsonForm from './forms/EditSimpsonForm';
import { errorNotification } from './Notification';
import {
  Table,
  Avatar,
  Spin,
  Modal,
  Empty,
  PageHeader,
  //Button,
  notification, 
  Popconfirm
} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const getIndicatorIcon = () => <LoadingOutlined style={{ fontSize: 24 }} spin />;

class App extends Component {

  state = {
    simpsons: [],
    isFetching: false,
    selectedSimpson: {},
    isAddSimpsonModalVisisble: false,
    isEditSimpsonModalVisible: false
  }

  componentDidMount () {
    this.fetchSimpsons();
  }

  openAddSimpsonModal = () => this.setState({isAddSimpsonModalVisisble: true})

  closeAddSimpsonModal = () => this.setState({isAddSimpsonModalVisisble: false})

  openEditSimpsonModal = () => this.setState({ isEditSimpsonModalVisible: true })
  
  closeEditSimpsonModal = () => this.setState({ isEditSimpsonModalVisible: false })

  openNotificationWithIcon = (type, message, description) => notification[type]({message, description});

  fetchSimpsons = () => {
    this.setState({
      isFetching: true
    });
    getAllSimpsons()
      .then(res => res.json()
      .then(simpsons => {
        console.log(simpsons);
        this.setState({
          simpsons,
          isFetching: false
        });
      }))
      .catch(error => {
        console.log(error.message);
        const message = error.message;
        const description = error.error;
        errorNotification(message, description);
        this.setState({
          isFetching: false
        });
      });
  }

  editUser = selectedSimpson => {
    this.setState({ selectedSimpson });
    this.openEditSimpsonModal();
  }

  updateSimpsonFormSubmitter = simpson => {
    updateSimpsonCharacter(simpson.simpsonId, simpson).then(() => {
      this.openNotificationWithIcon('success', 'Simpson updated', `${simpson.simpsonId} was updated`);
      this.closeEditSimpsonModal();
      this.fetchSimpsons();
    }).catch(err => {
      console.error(err.error);
      this.openNotificationWithIcon('error', 'error', `(${err.error.status}) ${err.error.error}`);
    });
  }

  deleteSimpson = simpsonId => {
    deleteSimpsonCharacter(simpsonId).then(() => {
      this.openNotificationWithIcon('success', 'Simpson deleted', `${simpsonId} was deleted`);
      this.fetchSimpsons();
    }).catch(err => {
      this.openNotificationWithIcon('error', 'error', `(${err.error.status}) ${err.error.error}`);
    });
  }

  render() {

    const { simpsons, isFetching, isAddSimpsonModalVisisble } = this.state;

    const commonElements = () => (
      <div>
        <Modal
          title='Add new simpson character'
          visible={isAddSimpsonModalVisisble}
          onOk={this.closeAddSimpsonModal}
          onCancel={this.closeAddSimpsonModal}
          width={1000}>
          <AddSimpsonForm 
            onSuccess={() => {
              this.closeAddSimpsonModal(); 
              this.fetchSimpsons();
            }}
            onFailure={(error) => {
              const message = error.error.message;
              const description = error.error.httpStatus;
              errorNotification(message, description);
            }}
          />
        </Modal>

        <Modal
          title='Edit'
          visible={this.state.isEditSimpsonModalVisible}
          onOk={this.closeEditSimpsonModal}
          onCancel={this.closeEditSimpsonModal}
          width={1000}>
          
          <PageHeader title={`${this.state.selectedSimpson.simpsonId}`}/>
          
          <EditSimpsonForm 
            initialValues={this.state.selectedSimpson} 
            submitter={this.updateSimpsonFormSubmitter}/>
        </Modal>

        <Footer
          numberOfSimpsos={simpsons.length}
          handleAddSimpsonClickEvent={this.openAddSimpsonModal}
        />  
      </div>
    );

    if (isFetching) {
      return (
        <Container>
          <Spin indicator={getIndicatorIcon()}/>
        </Container>
      );
    }

    if (simpsons && simpsons.length) {
      const columns = [
        {
          title: '',
          key: 'avatar',
          render: (text, simpson) => (
            <Avatar size='large'>
              {`${simpson.name.charAt(0).toUpperCase()}${simpson.surname.charAt(0).toUpperCase()}`}
            </Avatar>
          )
        },
        {
          title: 'Simpson Id',
          dataIndex: 'simpsonId',
          key: 'simpsonId'
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: 'Surname',
          dataIndex: 'surname',
          key: 'surname'
        },
        {
          title: 'Birthday',
          dataIndex: 'birthday',
          key: 'birthday'
        },
        {
          title: 'Country',
          dataIndex: 'country',
          key: 'country'
        },
        {
          title: 'City',
          dataIndex: 'city',
          key: 'city'
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Fragment>
              <Popconfirm
                placement='topRight'
                title={`Are you sure to delete ${record.simpsonId}`} 
                onConfirm={() => this.deleteSimpson(record.simpsonId)} okText='Yes' cancelText='No'
                onCancel={e => e.stopPropagation()}>
                <button type='danger' onClick={(e) => e.stopPropagation()}>Delete</button>
              </Popconfirm>
              <button style={{marginLeft: '5px'}} type='primary' onClick={() => this.editUser(record)}>Edit</button>
            </Fragment>
          ),
        }
      ];

      return (
        <Container>
          <Table 
            style={{marginBottom: '100px'}}
            dataSource={simpsons} 
            columns={columns} 
            pagination={false}
            rowKey='simpsonId'/>
          {commonElements()}
        </Container>
      );

    }

    return (
      <Container>
        <Empty description={
          <h2>No Simpsons character found</h2>
        }/>
        {commonElements()}
      </Container>
    );
  }
}

export default App;