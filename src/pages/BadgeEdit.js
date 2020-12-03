import React from 'react';


//importo los estilos
import './styles/BadgeEdit.css';

//importo las imagenes necesarias
import logoHeader from '../images/platziconf-logo.svg';

//importo mis componentes
import Badge from '../components/Badge';
import BadgeForm from '../components/BadgeForm';
import PageLoading from '../components/PageLoading';
import api from '../api';



class BadgeEdit extends React.Component{

   state = {
      loading: true,
      error: null,
      form: {
         firstName: '',
         lastName: '',
         jobTitle: '',
         twitter: '',
         email: '',
         avatarUrl: ''
      }
   };

   componentDidMount(){
      this.fetchData()
   }

   fetchData = async e => {
      this.setState({
         loading: true,
         error: null
      });

      try {
         const data = await api.badges.read(
            this.props.match.params.badgeId
         );
         this.setState({
            loading: false,
            form: data
         });
      } catch (error) {
         this.setState({
            loading: false,
            error: error
         })
      }

   }

   handleChange = e => {
      // const nextForm = this.state.form;
      // nextForm[e.target.name] = e.target.value;

      this.setState({
         form: {
            ...this.state.form,
            [e.target.name]: e.target.value
         },
      });
   };

   handleSubmit = async e => {
      e.preventDefault();
      this.setState({loading: true, error: null});


      try {
         await api.badges.update(this.props.match.params.badgeId, this.state.form);
         this.setState({loading: false});
         
         this.props.history.push('/badges');


      } catch (error) {
         this.setState({loading: false, error: error});
      }
   }

   render(){
      if(this.state.loading){
         return <PageLoading />
      }
      return(
         <React.Fragment>           
            <div className="BadgeEdit__hero">
               <img className="BadgeEdit__hero-image img-fluid" src={logoHeader} alt="Logo" />               
            </div>

            <div className="container">
               <div className="row">
                  <div className="col-6">
                     <Badge 
                        firstName={this.state.form.firstName || 'FIRST_NAME' }
                        lastName={this.state.form.lastName || 'LAST_NAME'}
                        jobTitle={this.state.form.jobTitle || 'JOB_TITLE'}
                        twitter={this.state.form.twitter || 'TWITTER'}
                        email={this.state.form.email || 'EMAIL'}
                        avatarUrl="https://es.gravatar.com/avatar"
                     />
                  </div>
                  <div className="col-6">
                  <h1>Edit Attendant</h1>

                     <BadgeForm
                        onChange={this.handleChange}
                        onSubmit={this.handleSubmit}
                        formValues={this.state.form}
                        error={this.state.error}
                     />
                  </div>
               </div>
            </div>
         </React.Fragment>
      );
   }
}

export default BadgeEdit;