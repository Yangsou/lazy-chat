import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import { ActionType, IAlertState } from 'root/store';

@Component({
  template: require('./view.html'),
  props: {
    alert: Object
  }
})
export class TopAlertComponent extends Vue {

  public alert: IAlertState;

  public mounted() {

    if (this.alert && this.alert.opened) {
      this.$message({
        type: this.alert.type,
        message: this.alert.message,
        showClose: true
      });
      this.$store.dispatch(ActionType.CloseTopAlert);
    }

    return;
  }

}
