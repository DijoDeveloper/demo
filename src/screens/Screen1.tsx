import * as UserActions from '../redux/actions/userActions.action';

/* eslint-disable react-native/no-inline-styles */
import {
  Dimensions,
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import EStyleSheet from 'react-native-extended-stylesheet';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {IProduct} from '../helpers/interfaces';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Screen2 from './Screen2';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

interface Screen1Props {
  navigation: any;
  products: IProduct[];
  actions: any;
}

const Screen1 = (props: Screen1Props) => {
  const [dataItem, setDataItem] = useState(props.products);

  const handleAdd = (dItem: IProduct, index: number, action: string) => {
    let item = JSON.parse(JSON.stringify(dItem));
    let updateFlag = true;
    switch (action) {
      case 'add': {
        if (item.quantity > 19) {
          updateFlag = false;
        } else {
          item.quantity = item.quantity + 1;

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
      let newDataItem = JSON.parse(JSON.stringify(dataItem));
      newDataItem[index] = item;
      setDataItem(newDataItem);
    }
  };

  const getCount = () => {
    let filteredItem = dataItem.filter((data: IProduct) => data.quantity > 0);
    if (filteredItem.length > 0) {
      return '( ' + filteredItem.length + ' ITEMS )';
    }
  };

  useEffect(() => {
    setDataItem(props.products);
  }, [props.products]);

  const nextScreen = () => {
    props.actions.userActions.updateUserAction(
      'products',
      JSON.parse(JSON.stringify(dataItem)),
      'UPDATE_PRODUCTS',
    );
    setTimeout(() => {
      props.navigation.navigate(Screen2.name, {});
    }, 100);
  };

  return (
    <>
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={styles.imageContainer}>
          <ImageBackground
            imageStyle={{opacity: 0.8}}
            source={require('../../assets/images/bgmain.jpeg')}
            style={{width: '100%', height: '100%'}}>
            <LinearGradient
              start={{x: 0, y: 1}}
              end={{x: 0, y: 0}}
              colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
              style={[styles.lg, {padding: 8}]}>
              <View style={styles.iconView}>
                <TouchableOpacity onPress={() => {}}>
                  <Ionicons name="ios-arrow-back" color={'white'} size={35} />
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity onPress={() => {}}>
                    <Feather name="share" color={'white'} size={25} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{marginLeft: 20, marginTop: 1}}
                    onPress={() => {}}>
                    <Ionicons
                      name="information-circle-outline"
                      color={'white'}
                      size={28}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>
        <View style={styles.sp}>
          <Text style={styles.sp1}>Inka Restaurant</Text>
          <Text style={styles.sp2}>
            <Feather name={'star'} size={14} />
            {'\t'}5.0(200+) | All days : 09:00 AM - 06:00 PM
          </Text>
          <Text style={styles.sp3}>
            <Feather name={'phone-call'} size={14} />
            {'\t\t'}Reach us at : 9897656712
          </Text>
          <TouchableOpacity style={styles.sp4}>
            <Text style={styles.sp4Text}>BOOK A TABLE</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.sv}>
          <Text style={styles.sp1}>Starter</Text>
        </View>
        <FlatList
          style={{padding: 5, marginTop: 10, paddingHorizontal: 20}}
          data={dataItem}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={true}
          numColumns={1}
          renderItem={({item, index}) => {
            return (
              <View
                key={item.id}
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  marginBottom: 15,
                }}>
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
                      style={[styles.sp1, {marginTop: 10, color: '#E9B97C'}]}>
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
                  {item.quantity === 0 ? (
                    <TouchableOpacity
                      onPress={() => handleAdd(item, index, 'add')}
                      style={[
                        styles.sp4,
                        {
                          backgroundColor: 'transparent',
                          borderWidth: 1,
                          borderColor: '#E9B97C',
                          elevation: 0,
                          paddingVertical: 5,
                        },
                      ]}>
                      <Text style={[styles.sp4Text, {color: 'black'}]}>
                        Add
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.incdec}>
                      <Feather
                        onPress={() => {
                          handleAdd(item, index, 'minus');
                        }}
                        style={{
                          paddingRight: 13,
                        }}
                        name={'minus'}
                        size={20}
                      />
                      <Text>{item.quantity}</Text>
                      <Feather
                        onPress={() => {
                          item.quantity < 20
                            ? handleAdd(item, index, 'add')
                            : '';
                        }}
                        style={{
                          paddingLeft: 13,
                        }}
                        name={'plus'}
                        size={20}
                        color={item.quantity < 20 ? 'black' : '#D1D1D1'}
                      />
                    </View>
                  )}
                </View>
              </View>
            );
          }}
        />
        <TouchableOpacity
          onPress={nextScreen}
          activeOpacity={0.8}
          style={styles.cart}>
          <Text style={[styles.sp4Text, {fontSize: 18}]}>
            <Ionicons name={'cart-outline'} size={20} /> VIEW CART {getCount()}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} style={styles.menu}>
          <MaterialCommunityIcons name={'food'} size={22} />
          <Text style={[styles.menuText]}>MENU</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = EStyleSheet.create({
  imageContainer: {
    width: '100%',
    height: Dimensions.get('screen').height * 0.25,
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
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    elevation: 5,
    alignSelf: 'center',
    borderRadius: 5,
    backgroundColor: '$whiteColour',
    position: 'absolute',
    top: '20%',
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
    marginTop: '40%',
    width: '90%',
    alignSelf: 'center',
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
  incdec: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderWidth: 0.6,
    borderColor: '#E9B97C',
    borderRadius: 3,
  },
});

const mapStateToProps = (state: any) => {
  return {
    products: state.userActions.products,
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
const Screen1Container = connect(mapStateToProps, mapDispatchToProps)(Screen1);

export default {component: Screen1Container, name: 'Screen1'};
