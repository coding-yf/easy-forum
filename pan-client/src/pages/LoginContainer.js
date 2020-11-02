/*redux*/
import {connect} from 'react-redux';
import {Action} from '../store';
/*组件*/
import Login from '../components/login';

/*注意，因为有多个reducer，改变store上数据的权力是分属于不同的reducer的，
  所以取state值时要指明是从哪个reducer上取--故为state.name.uername，而不是state.username
*/
function mapStateToProps(state, ownProps){
  return {
    username: state.name.username,  /*注意：不是state.username！！！*/
    storeState: state
  }
}

function mapDispatchToProps(dispatch, ownProps){
  return {
    onSaveUserName: function(username){
      dispatch(Action.save_username(username));
    }
  }
}

let  LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);
export default LoginContainer;