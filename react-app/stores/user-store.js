import Reflux from 'reflux';
import $ from 'jquery';
import UserActions from '../actions/user-actions';
import _ from 'underscore';

let UserStore = Reflux.createStore({
  listenables: [UserActions],
  users: [],
  getInitialState () {
    return {
      users:[]
    }
  },
  fetchUser (){
    let _this = this;
    this.users = [ {email: "luisk.hernandez.macias@gmail.com", name: "Luisk"},{ email: "luis.macias@koombea.com", name: "presto"}];
    this.trigger({users: this.users});
    // $.ajax({
    //   url: "http://localhost:1337/me",
    //   success: function(data){
    //     _this.user = data.user;
    //     _this.trigger({ user: _this.user});
    //   }
    // })
  }
});

export default UserStore;
