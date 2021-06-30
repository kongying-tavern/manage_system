<template>
  <div class="layer_edit">
    <div style="width:100%;height:1px"></div>
    <div class="row justify-center" style="margin-top:20px">
      <div class="col-11">
        <h5 class="page_title">点位审核页面</h5>
      </div>
      <div class="row col-11 justify-between" style="height:500px">
        <div class="col-4">
          <q-card class="my-card">
            <q-card-section>
              <h6 class="selector_title">类型筛选</h6>
              <q-btn
                color="grey"
                round
                flat
                dense
                size="20px"
                :icon="
                  expand_selector ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
                "
                @click="expand_selector = !expand_selector"
                class="expand_btn"
              />
            </q-card-section>
            <!-- 筛选器 -->
            <q-slide-transition>
              <div v-show="expand_selector" class="card_main">
                <q-card-section>
                  <p>按地区选择：</p>
                  <q-option-group
                    v-model="region_select_val"
                    :options="region_select_options"
                    color="primary"
                    inline
                  />
                </q-card-section>
                <q-card-section>
                  <p>按地区选择：</p>
                  <q-option-group
                    v-model="itemtype_select_val"
                    :options="itemtypen_select_options"
                    color="primary"
                    inline
                  />
                </q-card-section>
                <q-card-section>
                  <p>按物品选择：</p>
                  <q-option-group
                    v-model="itemtype_select_val"
                    :options="itemtypen_select_options"
                    color="primary"
                    inline
                  />
                </q-card-section>
              </div>
            </q-slide-transition>
          </q-card>
        </div>
        <div class="col-7" id="map"></div>
      </div>
      <div class="col-11" style="margin-top:30px">
        <q-table
          title="点位列表"
          :data="data"
          :columns="columns"
          row-key="name"
          selection="multiple"
          :selected-rows-label="getSelectedString"
          :selected.sync="selected_layers_array"
        >
          <!-- 表格头检索插槽 -->
          <template v-slot:top-right>
            <div class="row">
              <q-input
                outlined
                v-model="layer_search_value"
                placeholder="请输入要查询的点位ID"
              />
              <q-btn color="primary" label="搜索" style="margin-left:20px" />
            </div>
          </template>
        </q-table>
      </div>
    </div>
    <!-- 编辑点位弹窗 -->
    <q-dialog v-model="edit_window">
      <q-card>
        <q-card-section>
          <q-list bordered separator style="width:500px">
            <q-item>
              <q-item-section>
                编辑点位名称
              </q-item-section>
              <q-item-section>
                <q-input
                  outlined
                  v-model="edit_datalist.layer_itemname"
                  placeholder="请输入编辑后的点位名称"
                >
                </q-input>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                编辑点位描述
              </q-item-section>
              <q-item-section>
                <q-input
                  outlined
                  type="textarea"
                  v-model="edit_datalist.layer_item_des"
                  placeholder="请输入修改后的点位描述"
                >
                </q-input>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                编辑点位图片
              </q-item-section>
              <q-item-section>
                <q-img
                  :src="'https://placeimg.com/500/300/nature'"
                  spinner-color="white"
                  placeholder-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg=="
                  style="height: 140px; max-width: 150px;margin:0 auto 15px"
                />
                <q-file
                  clearable
                  outlined
                  v-model="edit_datalist.layer_img"
                  label="上传图片"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-section>
          <q-btn color="primary" label="确认" />
          <q-btn
            color="white"
            text-color="primary"
            label="取消"
            @click="edit_window = false"
            style="margin-left:30px"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="seamless" seamless position="right">
      <q-card style="width: 350px">
        <q-linear-progress :value="0.6" color="pink" />

        <q-card-section class="row items-center no-wrap">
          <div>
            <div class="text-weight-bold">The Walker</div>
            <div class="text-grey">Fitz & The Tantrums</div>
          </div>

          <q-space />

          <q-btn flat round icon="play_arrow" />
          <q-btn flat round icon="pause" />
          <q-btn flat round icon="close" v-close-popup />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { initmap } from "../api/map.js";
import { options_type_select } from "../service/request";
export default {
  data() {
    return {
      map: "",
      seamless: false,
      expand_selector: true,
      region_select_val: "0",
      layer_search_value: "",
      edit_window: false,
      region_select_options: [
      ],
      itemtype_select_val: "",
      itemtypen_select_options: [
        {
          label: "蒙德",
          value: "md"
        },
        {
          label: "璃月",
          value: "ly"
        }
      ],
      columns: [
        {
          name: "layer_id",
          label: "点位ID",
          align: "center",
          field: "layer_id"
        },
        {
          name: "layer_region",
          label: "点位地区",
          align: "center",
          field: "layer_region"
        },
        {
          name: "layer_type",
          label: "点位类型",
          align: "center",
          field: "layer_type"
        },
        {
          name: "layer_itemname",
          label: "点位物品名称",
          align: "center",
          field: "layer_itemname"
        },
        {
          name: "layer_addtime",
          label: "点位新增时间",
          align: "center",
          field: "layer_addtime"
        }
      ],
      data: [
        {
          layer_id: "1",
          layer_region: "蒙德",
          layer_type: "特产",
          layer_itemname: "蒲公英籽",
          layer_addtime: "2021年6月30日15:38:03"
        }
      ],
      edit_datalist: {},
      selected_layers_array: [],
      selectors_options:[],
    };
  },
  methods: {
    detail_edit(row) {
      console.log(row);
      this.edit_window = true;
    },
    test() {
      let that = this;
      L.marker([-26.95145308349826, 44.659423828125])
        .addTo(this.map)
        .on("click", function() {
          that.seamless = true;
        });
    },
    //获取选择的表格点位
    getSelectedString() {
      console.log(this.selected_layers_array);
    }
  },
  mounted() {
    let that = this;
    options_type_select().then(function(res) {
      console.log(res.data.data);
      that.selectors_options=res.data.data;
      for (let i in res.data.data) {
        that.region_select_options.push({
          label: res.data.data[i].name,
          value: i
        });
      }
    });
    this.map = initmap(this.map);
  }
};
</script>

<style>
p {
  margin-bottom: 10px;
}
.page_title {
  margin: 0px auto 15px;
}
.expand_btn {
  position: absolute;
  top: 10px;
  right: 10px;
}
.selector_title {
  margin: 0;
  text-align: center;
}
.card_main .q-card__section--vert {
  padding: 10px 16px;
}
</style>