function helpFn() {
    console.log(`
    List of All the commands:
        + peppy tree "directoryPath"
        + peppy organise "directoryPath"
        + peppy help
    `);
}

module.exports = {
    helpKey: helpFn
}