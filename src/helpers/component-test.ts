import {merge} from 'lodash';
import { SinonSpy } from 'sinon';
import Vue, { Component } from 'vue';
import { ILogger } from '../services';

export interface IComponents {
  [key: string]: Component;
}

export class ComponentTest {

  public vm: Vue;

  constructor(private template: string, private components: IComponents) {
  }

  public createComponent(createOptions?: any): void {
    const options = {
      template: this.template,
      components: this.components
    };
    if (createOptions) {
      merge(options, createOptions);
    }
    this.vm = new Vue(options).$mount();
  }

  public async execute(callback: (vm: Vue) => Promise<void> | void): Promise<void> {
    await Vue.nextTick();
    await callback(this.vm);
  }

}

export class MockLogger implements ILogger {

  constructor(private loggerSpy: SinonSpy) {
  }

  public debug(msg: any) {
    this.loggerSpy(msg);
  }

  public info(msg: any) {
    this.loggerSpy(msg);
  }

  public warn(msg: any) {
    this.loggerSpy(msg);
  }

  public error(msg: any) {
    this.loggerSpy(msg);
  }
}
