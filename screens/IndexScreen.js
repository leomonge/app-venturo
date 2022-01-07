import React, { useState, useRef } from 'react' 
import { SafeAreaView, Dimensions, StyleSheet, StatusBar, FlatList, View, Image, Text, TouchableOpacity } from 'react-native'

const {width, height} = Dimensions.get('window')

const COLORS = {primary: '#282534', white:'#fff'}

const slides = [
  {
    id: '1',
    image: require('../assets/onBoarding/1.png'),
    title: 'Asesoria Gratruita',
    subtitle: 'Para personas de escasos recursos económicos'
  },
  {
    id: '2',
    image: require('../assets/onBoarding/2.png'),
    title: 'Eres Abogado',
    subtitle: 'Únete a nuestra al mejor firma de abogados'
  },
  {
    id: '3',
    image: require('../assets/onBoarding/3.png'),
    title: 'Encuentre a su Abogado',
    subtitle: 'La mejor asesoria legal con los mejores abogados del Perú'
  },
]

const Slide = ({item}) => {
  return (
    <View style={{alignItems: 'center'}}> 
      <Image 
        source={item.image} 
        style={{height: '75%', width, resizeMode: 'contain'}}
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
    </View>
  )
}

export default ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const ref = useRef(null)
  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.25, 
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}
      >
        <View 
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,    
          }}
        >
          {slides.map((_,index)=> (
            <View key={index} style={[styles.indicator, currentSlideIndex == index && {
              backgroundColor: COLORS.white,
              width: 25,
              }
            ]}/>
          ))}
        </View>
        <View style={{marginBottom: 20}}>
          {
            currentSlideIndex == slides.length - 1 ?
            <>
            <View style={{height: 50}}>
              <TouchableOpacity style={[styles.btn]} onPress={()=>navigation.navigate('Login')}>
                <Text style={{ fontWeight:'bold', fontSize: 15 }}>
                  SOY CLIENTE
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{height:15}}/>
            <View style={{height: 50}}>
              <TouchableOpacity style={[styles.btn, 
                { 
                  backgroundColor: 'transparent', 
                  borderWidth: 1,
                  borderColor: COLORS.white
                }
              ]}
              onPress={()=>navigation.navigate('RegistroAbogado')}>
                <Text style={{ fontWeight:'bold', fontSize: 15, color: COLORS.white }}>
                  SOY ABOGADO
                </Text>
              </TouchableOpacity>
            </View>
            </>
            :
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity 
              onPress={skip}
              style={[styles.btn, 
                { 
                  backgroundColor: 'transparent', 
                  borderWidth: 1,
                  borderColor: COLORS.white
                }
              ]}>
                <Text style={{ fontWeight:'bold', fontSize: 15, color: COLORS.white }}>
                  SALTAR
                </Text>
              </TouchableOpacity>
              <View style={{width:15}}/>
              <TouchableOpacity style={[styles.btn]} onPress={goNextSlide}>
                <Text style={{ fontWeight:'bold', fontSize: 15 }}>
                  SIGUIENTE
                </Text>
              </TouchableOpacity>
            </View>
          } 
        </View>
      </View>
    )
  }
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x
    const currentIndex = Math.round(contentOffsetX/width)
    setCurrentSlideIndex(currentIndex)
  }
  const goNextSlide = () => {
    const nexttSlideIndex = currentSlideIndex + 1
    if(nexttSlideIndex != slides.length){
      const offset = nexttSlideIndex * width
      ref?.current.scrollToOffset({offset})
      setCurrentSlideIndex(nexttSlideIndex)
    }
  }
  const skip = () => {
    const lastSlideIndex = slides.length - 1
    const offset = lastSlideIndex * width
    ref?.current.scrollToOffset({offset})
    setCurrentSlideIndex(lastSlideIndex)
  }
  return(
    <SafeAreaView
      style={{flex:1, backgroundColor: COLORS.primary}}
    >
      <StatusBar 
        style={{ backgroundColor: COLORS.primary }}
      />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        pagingEnabled
        data={slides}
        contentContainerStyle={{height: height * 0.75}}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item})=> <Slide item={item} />}
      />
      <Footer/>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  title:{
    color: COLORS.white,
    fontSize: 22,
    fontWeight:'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle:{
    color: COLORS.white,
    fontSize: 13,
    marginTop: 10,
    maxWidth: '70%',
    textAlign: 'center',
    lineHeight: 23,
  },
  indicator:{
    height: 2.5,
    width: 10,
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 2,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
})