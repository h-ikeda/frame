/*eslint-env node */
/*globals S OrbitVp*/

module.exports = function(query, solufaComponent, cameraId) {
    S(function(m) {
        m.mount(S.document.body, solufaComponent);
        m.render(S.document.head,
            m("rdr", {
                init: {
                    frame: query
                },
                clearColor: "#fff"
            }, [
                m(OrbitVp, {cam: "#" + cameraId})
            ])
        );
    });
};
