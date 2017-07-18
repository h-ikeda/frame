//
// input / result モジュールの共通関数です。
//
// getters に、登録されているモジュール名の配列を返す modules 関数を定義する必要があります。
//
export const getters = {
    //
    // data() は、
    // {
    //     module1: { モジュールのdata },
    //     module2: { モジュールのdata },
    //     ・
    //     ・
    //     ・
    // }
    // 形式のオブジェクトを返す。
    // 主に解析用JSONデータ作成時に呼ばれます。
    //
    data(state, getters) {
        const t = {};
        getters["modules"].forEach((module) => {
            t[module] = getters[module + "/data"];
        });
        return t;
    },
    //
    // dataArray() は、
    // [{
    //     id: "モジュール名",
    //     dataArray: [ モジュールのdataArray ]
    // }, {
    //     id: "モジュール名",
    //     dataArray: [ モジュールのdataArray ]
    // }, ... ]
    // 形式の配列を返す。
    // 主にGUI表示用データとして呼ばれます。
    //
    dataArray: (state, getters) => getters["modules"].map((module) => ({
        id: module,
        data: getters[module + "/dataArray"]
    }))
};

export const actions = {
    //
    // setData() は、
    // getters の data() と同じ形式のオブジェクトを受け取り、
    // モジュール名に対応するプロパティ名のデータを各モジュールに渡します。
    // モジュール名に対応するプロパティ名が存在しないとき、
    // そのモジュールのデータは操作しません。
    // よって一部のモジュールにのみデータを渡すと、
    // 旧データとマージされます。
    //
    setData({dispatch, getters}, data) {
        getters["modules"].forEach((module) => {
            if (module in data) {
                dispatch(module + "/setData", data[module]);
            }
        });
    }
};
