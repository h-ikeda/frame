/*eslint-env node */
/*globals S OrbitVp*/

module.exports = function(wrapper, solufaComponent, cameraId) {
    S(function(m) {
	    m.mount(S.document.body, solufaComponent);
        m.render(S.document.head,
    	    m("rdr", {
    	        init: {
    	            frame: "#" + wrapper.id,
    	            preserveDrawingBuffer: true,
    	            antialias: true
    	        },
    	        clearColor: "#fff"
    	    }, [
		        m(OrbitVp, {cam: "#" + cameraId})
	        ])
	    );
    });
};