function requireAll(r) {
    r.keys().forEach(r);
}

requireAll(require.context('../../images/svgIcons/', true, /\.svg$/));