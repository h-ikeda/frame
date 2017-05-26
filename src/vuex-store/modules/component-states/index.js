import Vue from "vue";

export default {
    state: {
        drawerOpen: false,
        datatableSubheader: "",
        datatableColumns: [],
        datatableContent: {}
    },
    mutations: {
        setDrawerOpen(state, open) {
            state.drawerOpen = open;
        },
        setDatatableSubheader(state, subheader) {
            // 開発モードでは、データ型をチェックします。
            if (process.env.NODE_ENV !== "production" && typeof subheader !== "string") {
                throw "Datatable subheader should be a string.";
            }
            state.datatableSubheader = subheader;
        },
        setDatatableColumns(state, columns) {
            // 開発モードでは、データ型をチェックします。
            if (process.env.NODE_ENV !== "production") {
                if (!Array.isArray(columns)) {
                    throw "Datatable columns should be an array.";
                } else {
                    columns.forEach((column) => {
                        if (!("propertyName" in column)) {
                            throw "Each items of datatable columns should have the \"propertyName\" property.";
                        }
                        if (!("caption" in column)) {
                            throw "Each item of datatable columns should have the \"caption\" property.";
                        }
                    });
                }
            }
            state.datatableColumns = columns;
        },
        setDatatableContent(state, content) {
            // 開発モードでは、データ型をチェックします。
            if (process.env.NODE_ENV !== "production") {
                if (typeof content !== "object") {
                    throw "Datatable content should be an object.";
                } else {
                    Object.keys(content).forEach((key) => {
                        if (typeof content[key] !== "object") {
                            throw "Each item of datatable content should be an object.";
                        }
                    });
                }
            }
            state.datatableContent = content;
        }
    }
};