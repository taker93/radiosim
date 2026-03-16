import type {Component} from 'vue';
import LK24Device from '~/components/devices/LK24Device.vue';
import LkccDevice from '~/components/devices/LKCCDevice.vue';

export const deviceRegistry: Record<string, Component> = {
    lk24: LK24Device,
    lkcc: LkccDevice,
};
