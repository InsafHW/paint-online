function joinClassNames(...classes: Array<string|null>) {
    return classes
        .filter(x => x)
        .join(' ')
}

export {
    joinClassNames
}