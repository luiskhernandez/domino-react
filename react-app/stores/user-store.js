import Reflux from 'reflux';
import $ from 'jquery';
import UserActions from '../actions/user-actions';
import _ from 'underscore';

let UserStore = Reflux.createStore({
  listenables: [UserActions],
  users: [],
  getInitialState () {
    return {
      users:[],
      current_user:null,
    }
  },
  fetchUser (){
    let _this = this;
    this.trigger({users: this.users});
    $.ajax({
      url: "/me",
      success: function(data){
        _this.user = data.user;
        _this.trigger({ current_user: _this.user});
      }
    })
  }
});

export default UserStore;
