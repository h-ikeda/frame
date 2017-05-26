<template>
    <mu-table fixedHeader enableSelectAll multiSelectable height="calc(100% - 57px)">
        <mu-thead slot="header">
            <mu-tr>
                <mu-th>ID</mu-th>
                <mu-th>X</mu-th>
                <mu-th>Y</mu-th>
                <mu-th>Z</mu-th>
            </mu-tr>
        </mu-thead>
        <mu-tbody>
            <mu-tr v-for="key, index in Object.keys($store.state.componentStates.datatableContent)" :key="key">
                <mu-td>{{index}}</mu-td>
                <mu-td>{{$store.state.componentStates.datatableContent[key].x}}</mu-td>
                <mu-td>{{$store.state.componentStates.datatableContent[key].y}}</mu-td>
                <mu-td>{{$store.state.componentStates.datatableContent[key].z}}</mu-td>
            </mu-tr>
        </mu-tbody>
    </mu-table>
</template>

<script>
    export default {
        data() {
            let tableData = {};
            let keys = [];
            for (let i=0; i < 20; ++i) {
                const key = String.fromCharCode(65 + i);
                keys.push(key);
                tableData[key] = {
                    x: i + 1,
                    y: i * 2,
                    z: i / 2
                };
            }
            return {
                tableData,
                keys
            };
        }
    };
</script>