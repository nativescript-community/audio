import Vue from 'nativescript-vue';
import { PermsTraceCategory } from '@nativescript-community/perms';
import { Trace } from '@nativescript/core';
Trace.addCategories(PermsTraceCategory);
Trace.enable();
import Demo from './Demo.vue';

export function installPlugin() {}

export const demos = [{ name: 'Demo', path: 'basic', component: Demo }];
