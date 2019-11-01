import { find } from 'lodash';
import { IPaginationState } from 'root/store';
import Vue from 'vue';

import { StatusCode } from 'root/models';
import Component from 'vue-class-component';
import { Avatar } from '../Avatar';
import './style.scss';

export interface IItemActionForListDataComponent {
  label: string;
  emitName: string;
}

export type IActionForListDataComponent = Array<string | IItemActionForListDataComponent>;

@Component({
  template: require('./view.html'),
  props: {
    data: {
      type: Array,
      default: []
    },
    align: {
      type: String,
      default: 'left'
    },
    actions: Array,
    columns: Array,
    pagination: Object,
    loading: Boolean,
    eyeAction: Boolean,
    size: {
      type: String,
      default: 'default'
    },
    fixed: String,
    showAction: {
      type: Boolean,
      default: true
    },
    noHandleDisabled: Boolean
  },
  components: {
    avatar: Avatar,
  }
})

export class ListData extends Vue {

  public pagination: IPaginationState;
  public actions: IActionForListDataComponent;
  public data: any[];

  public currentChange(newValue) {
    this.pagination.page = newValue;
    window.scrollTo(0, 0);
    this.$emit('changePagination', this.pagination);
  }

  public get convertActions(): string[] {
    return this.actions.map((e) => {
      if (typeof e === 'object') {
        return e.label;
      }

      return e;
    });
  }

  public formatterActionLabel(action: string, model: any) {
    if (action === 'disabled' && model.status === StatusCode.Suspended) {
      return this.$t('active');
    }

    return this.$t(action);

  }

  public checkSlot(name) {
    const slots = Object.keys(this.$slots);
    const scopedSlots = Object.keys(this.$scopedSlots);
    if (Array.isArray(scopedSlots) && scopedSlots.length > 0) {
      return scopedSlots.find((e) => name === e);
    }
    if (Array.isArray(slots) && slots.length > 0) {
      return slots.find((e) => name === e);
    }

    return false;
  }

  public clickDropdown(newValue: string) {
    const value = newValue.split('|'),
      type = value[0],
      id = value[1];
    switch (type) {
    case 'detail':
    case 'view':
      this.$emit('clickDetail', id);
      break;
    case 'edit':
      this.$emit('clickUpdate', id);
      break;
    case 'delete':
      this.deleteConfirm(id);
      break;
    case 'disabled':
      this.disabledConfirm(id);
      break;
    case 'change-password':
      this.$emit('changePassword', id.toString());
      break;
    case 'templating':
      this.$emit('templating', find(this.$props.data, (e) => e.id.toString() === id));
      break;
    case 'close':
      this.$emit('clickClose', id.toString());
    }

    this.actions.forEach((e) => {
      if (typeof e === 'object' && type === e.label) {
        this.$emit(e.emitName, id);
      }
    });
  }

  public clickDetail(id: string) {
    this.$emit('clickDetail', id);
  }
  public text(model, scope) {
    return model[scope.column.property];
  }

  public disabledConfirm(id: string) {
    this.$msgbox({
      title: this.$t('confirm').toString(),
      message: this.$t('action_confirm_message').toString(),
      showCancelButton: true,
      confirmButtonText: this.$t('confirm').toString(),
      cancelButtonText: this.$t('cancel').toString(),
      beforeClose: (action, instance, done) => {
        if (action === 'confirm') {
          instance.confirmButtonLoading = true;
          instance.confirmButtonText = 'Loading...';
          this.$emit('handleDisabled', { id, instance, done });
        } else {
          done();
        }

        return;
      }
    });
    // .then(() => {
    //   this.$message({
    //     type: 'info',
    //     message: this.$t('disabled_successfully').toString()
    //   });
    // }).catch(() => {
    //   no handle
    // });

  }
  public deleteConfirm(id: string) {
    const model = find(this.data, (e) => e.id.toString() === id.toString());
    if (model.status === StatusCode.Suspended && this.$props.noHandleDisabled) {
      return;
    }
    this.$msgbox({
      title: this.$t('delete_confirm').toString(),
      message: this.$t('delete_confirm_message').toString(),
      showCancelButton: true,
      confirmButtonText: this.$t('confirm').toString(),
      cancelButtonText: this.$t('cancel').toString(),
      beforeClose: (action, instance, done) => {
        if (action === 'confirm') {
          instance.confirmButtonLoading = true;
          instance.confirmButtonText = 'Loading...';
          this.$emit('handleDelete', { id, instance, done });
        } else {
          done();
        }

        return;
      }
    }).then(() => {
      this.$message({
        type: 'info',
        message: this.$t('delete_successfully').toString()
      });
    }).catch(() => {
      // no handle
    });

  }

  public handleRowClick(model) {
    this.$emit('rowClick', model);
  }
}
