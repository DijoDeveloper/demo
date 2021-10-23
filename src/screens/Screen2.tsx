import * as UserActions from '../redux/actions/userActions.action';

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import EStyleSheet from 'react-native-extended-stylesheet';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {IProduct} from '../helpers/interfaces';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

interface Screen2Props {
  products: IProduct[];
  actions: any;
  metaData: IProduct[];
}

const Screen2 = (props: Screen2Props) => {
  const [products, setProducts] = useState(props.products);
  const [viewMore, setViewMore] = useState(false);
  const [dOpt, setDOtp] = useState(0);

  useEffect(() => {
    setProducts(props.metaData.filter((data: IProduct) => data.quantity > 0));
  }, [props.metaData]);

  const handleAdd = (item: IProduct, action: string) => {
    let updateFlag = true;
    switch (action) {
      case 'add': {
        if (item.quantity > 19) {
          updateFlag = false;
        } else {
          item.quantity += 1;
          updateFlag = true;
        }
        break;
      }

      case 'minus': {
        if (item.quantity < 1) {
          updateFlag = false;
        } else {
          item.quantity -= 1;
          updateFlag = true;
        }
        break;
      }
    }

    if (updateFlag) {
      let newDataItem: IProduct[];
      newDataItem = JSON.parse(JSON.stringify(props.metaData));
      let index = newDataItem.filter((val: IProduct) => val.id === item.id);
      newDataItem[index] = item;
      props.actions.userActions.updateUserAction(
        'products',
        newDataItem,
        'UPDATE_PRODUCTS',
      );
    }
  };

  const getTotalCost = () => {
    let totalCost = 0;
    products.map((val: IProduct) => {
      let quantity = val.quantity;
      // eslint-disable-next-line radix
      totalCost += quantity * parseInt(val.price);
    });

    return totalCost;
  };

  const getProductsToRender = () => {
    if (products.length > 2) {
      if (viewMore) {
        return products;
      } else {
        return products.slice(0, 2);
      }
    } else {
      return products;
    }
  };

  return (
    <>
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={styles.imageContainer}>
          <View style={styles.sp}>
            <Text style={[styles.sp1, {color: '#E9B97C'}]}>Total Cost</Text>
            <Text
              style={[
                styles.sp1,
                {marginTop: 10, color: 'black', fontSize: 22},
              ]}>
              <FontAwesome name="euro" size={22} color={'black'} />
              {'\t'}
              {getTotalCost()}
            </Text>
          </View>
        </View>
        <View style={{flex: 0.6}}>
          {products.length > 0 && (
            <View style={styles.sv}>
              <Text style={[styles.sp1, {marginBottom: 20}]}>Review Order</Text>
            </View>
          )}
          <FlatList
            style={{padding: 5, marginTop: 10, paddingHorizontal: 20}}
            data={getProductsToRender()}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={true}
            numColumns={1}
            renderItem={({item}) => {
              return (
                <View key={item.id} style={styles.strip}>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 0.6,
                    }}>
                    <View>
                      <View style={styles.sc1}>
                        <Text>N</Text>
                      </View>
                      {item.id === 1 && (
                        <View style={[styles.sc1, {marginTop: 8}]}>
                          <Text>D</Text>
                        </View>
                      )}
                    </View>
                    <View style={styles.sc2}>
                      <Text
                        style={[
                          styles.sp1,
                          {marginTop: 2, color: 'black', fontSize: 16},
                        ]}>
                        {item.name}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={[styles.sp2, {marginTop: 7, color: 'black'}]}>
                        {item.description}
                      </Text>
                      <Text
                        style={[
                          styles.sp1,
                          {marginTop: 10, marginBottom: 5, color: '#E9B97C'},
                        ]}>
                        <FontAwesome name="euro" size={20} color={'#E9B97C'} />
                        {'\t'}
                        {item.price}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 0.4,
                      alignItems: 'flex-end',
                    }}>
                    <View style={styles.plusminusView}>
                      <Feather
                        onPress={() => {
                          handleAdd(item, 'minus');
                        }}
                        style={{
                          paddingRight: 13,
                        }}
                        name={'minus'}
                        size={18}
                      />
                      <Text>{item.quantity}</Text>
                      <Feather
                        onPress={() => {
                          handleAdd(item, 'add');
                        }}
                        style={{
                          paddingLeft: 13,
                        }}
                        name={'plus'}
                        size={18}
                      />
                    </View>
                    <MaterialCommunityIcons
                      name={'message-text'}
                      size={23}
                      style={{
                        marginTop: 10,
                      }}
                    />
                  </View>
                </View>
              );
            }}
            ListEmptyComponent={() => (
              <Text style={[styles.sp1, {textAlign: 'center'}]}>
                Your Cart is Empty
              </Text>
            )}
          />
          {products.length > 2 && (
            <Text
              onPress={() => setViewMore(!viewMore)}
              style={[styles.showMore]}>
              {!viewMore ? 'Show More' : 'Show Less'}
            </Text>
          )}

          {products.length > 0 && (
            <View style={styles.sv}>
              <Text style={[styles.sp1, {marginBottom: 10}]}>
                Delivery Options
              </Text>
              <View style={styles.do1}>
                <TouchableOpacity
                  onPress={() => setDOtp(0)}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialIcons name={'local-restaurant'} size={30} />
                  <Text style={styles.do2}>Dine In</Text>
                  <MaterialIcons
                    color={dOpt === 0 ? '#E9B97C' : 'grey'}
                    name={
                      dOpt === 0
                        ? 'radio-button-checked'
                        : 'radio-button-unchecked'
                    }
                    size={24}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setDOtp(1)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 30,
                  }}>
                  <MaterialIcons name={'delivery-dining'} size={30} />
                  <Text style={styles.do2}>Take Away</Text>
                  <MaterialIcons
                    color={dOpt === 1 ? '#E9B97C' : 'grey'}
                    name={
                      dOpt === 1
                        ? 'radio-button-checked'
                        : 'radio-button-unchecked'
                    }
                    size={24}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        <TouchableOpacity activeOpacity={0.8} style={styles.cart}>
          <Text style={[styles.sp4Text, {fontSize: 18}]}>PLACE ORDER</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = EStyleSheet.create({
  imageContainer: {
    backgroundColor: '#081D2C',
    flex: 0.4,
    justifyContent: 'center',
  },
  lg: {
    position: 'absolute',
    width: '100%',
    height: 80,
  },
  iconView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  sp: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    elevation: 5,
    alignSelf: 'center',
    borderRadius: 5,
    backgroundColor: '$whiteColour',
  },
  sp1: {
    fontSize: 20,
    fontFamily: '$gilroyNormal600',
  },
  sp2: {
    fontSize: 14,
    lineHeight: '1rem',
    fontFamily: '$gilroyMedium',
    color: '$darkGreyColour',
    marginTop: 20,
  },
  sp3: {
    fontSize: 14,
    lineHeight: '1rem',
    fontFamily: '$gilroyMedium',
    color: '$darkGreyColour',
    marginVertical: 9,
  },
  sp4: {
    backgroundColor: '#152238',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 8,
  },
  sp4Text: {
    fontSize: 14,
    fontFamily: '$gilroyMedium',
    color: '$whiteColour',
  },
  sv: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  sc1: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderWidth: 0.7,
    borderColor: '$darkGreyColour',
    borderRadius: 5,
  },
  sc2: {
    marginLeft: 12,
  },
  cart: {
    backgroundColor: '#152238',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menu: {
    backgroundColor: '#E9B97C',
    position: 'absolute',
    bottom: '10%',
    left: '40%',
    minWidth: '15%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 5,
    elevation: 2,
  },
  menuText: {
    marginLeft: 10,
    color: 'black',
    fontFamily: '$gilroyNormal600',
    fontSize: 15,
  },
  strip: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '$darkGreyColour',
  },
  showMore: {
    alignSelf: 'flex-end',
    marginRight: 20,
    textDecorationStyle: 'dashed',
    textDecorationLine: 'underline',
    fontSize: 16,
    color: 'black',
    fontFamily: '$gilroyNormal600',
    paddingVertical: 10,
  },
  plusminusView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderWidth: 0.6,
    borderColor: '#E9B97C',
    borderRadius: 3,
  },
  do1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 10,
    paddingTop: 5,
  },
  do2: {
    fontFamily: '$gilroyNormal600',
    marginTop: 2,
    color: 'black',
    fontSize: 16,
    marginHorizontal: 10,
  },
});

const mapStateToProps = (state: any) => {
  const products = JSON.parse(JSON.stringify(state.userActions.products));
  return {
    products: products.filter((data: IProduct) => data.quantity > 0),
    metaData: state.userActions.products,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: {
      userActions: bindActionCreators(UserActions, dispatch),
    },
  };
};

/**
 * connect state and action
 */
const Screen2Container = connect(mapStateToProps, mapDispatchToProps)(Screen2);

export default {component: Screen2Container, name: 'Screen2'};
