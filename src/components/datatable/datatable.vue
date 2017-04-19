<template>
    <div>
        <h2>Table header</h2>
        <table>
            <thead>
                <tr>
                    <th v-for="item in columns">{{item.label}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="record in records">
                    <td v-for="item in columns">{{record[item.id]}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                columns: [{
                    id: "id",
                    label: "ID"
                }, {
                    id: "x",
                    label: "X"
                }, {
                    id: "y",
                    label: "Y"
                }, {
                    id: "z",
                    label: "Z"
                }],
                records: [{
                    id: 0,
                    x: 3,
                    y: 2,
                    z: 0.8
                }, {
                    id: 2,
                    x: 4,
                    y: -5.88,
                    z: -6
                }, {
                    id: 2,
                    x: 4,
                    y: -5.88,
                    z: -6
                }, {
                    id: 2,
                    x: 4,
                    y: -5.88,
                    z: -6
                }, {
                    id: 2,
                    x: 4,
                    y: -5.88,
                    z: -6
                }, {
                    id: 2,
                    x: 4,
                    y: -5.88,
                    z: -6
                }, {
                    id: 2,
                    x: 4,
                    y: -5.88,
                    z: -6
                }, {
                    id: 2,
                    x: 4,
                    y: -5.88,
                    z: -6
                }, {
                    id: 2,
                    x: 4,
                    y: -5.88,
                    z: -6
                }, {
                    id: 2,
                    x: 4,
                    y: -5.88,
                    z: -6
                }, {
                    id: 2,
                    x: 4,
                    y: -5.88,
                    z: -6
                }, {
                    id: 2,
                    x: 4,
                    y: -5.88,
                    z: -6
                }]
            };
        }
    };
</script>

<style scoped>
    table {
        width: 100%;
    }
    th, td {
        padding-right: 56px;
        border-bottom: 1px solid rgba(0, 0, 0, .12);
        text-align: right;
    }
    th:first-child, td:first-child {
        padding-left: 24px;
    }
    th:last-child, td:last-child {
        padding-right: 24px;
    }
    th {
        height: 56px;
    }
    td {
        height: 48px;
    }
</style>
