import React, { Component } from "react";
import { View } from "react-native";
import Carousel from "react-native-snap-carousel";

import { CAROUSEL_STYLE } from "../../styling/carousel";

export default class CustomCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      carouselItems: [],
    };
  }

  _renderItem({ item, index, ChildrenItem, onPressChildrenItem, itemWidth }) {
    return (
      <ChildrenItem
        item={item}
        key={index}
        onClick={() => onPressChildrenItem && onPressChildrenItem(item)}
        itemWidth={itemWidth}
      />
    );
  }

  render() {
    const {
      data,
      ChildrenItem,
      onPressChildrenItem,
      itemWidth,
      withImagePicker,
      onImagePick,
      useMediaCard,
      radius,
      onPressShop,
      onClickImage,
    } = this.props;
    return (
      <View style={CAROUSEL_STYLE.container}>
        <Carousel
          ref={(c) => {
            this._carousel = c;
          }}
          data={data || this.state.carouselItems}
          renderItem={({ item, index }) =>
            this._renderItem({
              item,
              index,
              ChildrenItem,
              onPressChildrenItem,
              withImagePicker,
              onImagePick,
              useMediaCard,
              radius,
              onPressShop,
              onClickImage,
              itemWidth,
            })
          }
          sliderWidth={itemWidth ? itemWidth * 2 : 300}
          itemWidth={itemWidth || 250}
          inactiveSlideOpacity={1}
          activeSlideAlignment="center"
        />
      </View>
    );
  }
}
