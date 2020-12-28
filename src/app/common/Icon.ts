import { current_build_type, build_type} from './Constants'

export const icon = {
    icon_on: 'icon_on',
    icon_off: 'icon_off'
}

const store = {
    dev: {
        icon_on: 'assets/icons/on.png',
        icon_off: 'assets/icons/off.png'
    },
    prod: {
        icon_on: 'assets/icons/on.png',
        icon_off: 'assets/icons/off.png'
    }
}

export const getIcon = (key: string) => {
    if (current_build_type == build_type.dev) {
        return store.dev[key]
    }

    return store.prod[key] 
}