    <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <View>
          <Text>{number}</Text>


          {/* <Button icon={<Airplay/>} onPress={()=>router.navigate("/(drawer)/auth")} >continue</Button> */}

          {/* <Link href="/auth">About</Link>  */}

          {/* <Link push href="/(drawer)/auth">Login</Link> */}

          {/* <XStack justifyContent='flex-start'>
            <Text>hey there</Text>
            <Text>hey there</Text>
          </XStack>

          <YStack flexDirection='row'>
            <Text>
              end
            </Text>
            <Text>
              end
            </Text>
          </YStack> */}


          {/* <H1 fontWeight={900} theme={"light"}>hey there</H1> */}


            {/* <View style={{backgroundColor: "white", padding: 20, borderRadius: 10}}>
            <ReactNativePhoneInput initialValue={number} onChangePhoneNumber={(value)=>setNumber(value)}/>
            </View> */}

            <Button icon={<Ionicons name='add-circle'/>}></Button>


            <Ionicons name='camera'>
              <ImagePicker/>
              </Ionicons>

            {/* <Video source={{uri: "https://www.youtube.com/watch?v=msRDbpet-CE"}}/> */}
            <VideoComp/>


            {/* card  */}
            {/* 
            import type { CardProps } from 'tamagui'

import { Button, Card, H2, Image, Paragraph, XStack } from 'tamagui'
export function CardDemo() {

  return (

    <XStack $sm={{ flexDirection: 'column' }} paddingHorizontal="$4" space>

      <DemoCard
        animation="bouncy"
        size="$4"
        width={250}
        height={300}
        scale={0.9}
        hoverStyle={{ scale: 0.925 }}
        pressStyle={{ scale: 0.875 }}
      />

      <DemoCard size="$5" width={250} height={300} />

    </XStack>

  )

}
export function DemoCard(props: CardProps) {

  return (

    <Card elevate size="$4" bordered {...props}>

      <Card.Header padded>

        <H2>Sony A7IV</H2>

        <Paragraph theme="alt2">Now available</Paragraph>

      </Card.Header>

      <Card.Footer padded>

        <XStack flex={1} />

        <Button borderRadius="$10">Purchase</Button>

      </Card.Footer>

      <Card.Background>

        <Image
          resizeMode="contain"
          alignSelf="center"
          source={{
            width: 300,
            height: 300,
            uri: '',
          }}
        />

      </Card.Background>

    </Card>

  )

}

            */}
            {/* card  */}



            {/* popover  */}
            {/* 
            <Popover size="$5" allowFlip {...props}>
      <Popover.Trigger asChild>
        <Button icon={Icon} />
      </Popover.Trigger>

      <Adapt when="sm" platform="touch">
        <Popover.Sheet modal dismissOnSnapToBottom>
          <Popover.Sheet.Frame padding="$4">
            <Adapt.Contents />
          </Popover.Sheet.Frame>
          <Popover.Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Popover.Sheet>
      </Adapt>

      <Popover.Content
        borderWidth={1}
        borderColor="$borderColor"
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        elevate
        animation={[
          'quick',
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
      >
        <Popover.Arrow borderWidth={1} borderColor="$borderColor" />
            */}
            {/* popover  */}


            {/* dialog  */}
            {/* 
            function DialogInstance() {
  return (
    <Dialog modal>
      <Dialog.Trigger asChild>
        <Button>Show Dialog</Button>
      </Dialog.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$4" gap="$4">
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="slow"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={['transform', 'opacity']}
          animation={[
            'quicker',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4"
        >
          <Dialog.Title>Edit profile</Dialog.Title>
          <Dialog.Description>
            Make changes to your profile here. Click save when you're done.
          </Dialog.Description>
          <Fieldset gap="$4" horizontal>
            <Label width={160} justifyContent="flex-end" htmlFor="name">
              Name
            </Label>
            <Input flex={1} id="name" defaultValue="Nate Wienert" />
          </Fieldset>
          <Fieldset gap="$4" horizontal>
            <Label width={160} justifyContent="flex-end" htmlFor="username">
              <TooltipSimple label="Pick your favorite" placement="bottom-start">
                <Paragraph>Food</Paragraph>
              </TooltipSimple>
            </Label>
            <SelectDemoItem />
          </Fieldset>

          <XStack alignSelf="flex-end" gap="$4">
            <DialogInstance />

            <Dialog.Close displayWhenAdapted asChild>
              <Button theme="active" aria-label="Close">
                Save changes
              </Button>
            </Dialog.Close>
          </XStack>

          <Unspaced>
            <Dialog.Close asChild>
              <Button
                position="absolute"
                top="$3"
                right="$3"
                size="$2"
                circular
                icon={X}
              />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}
            */}
            {/* dialog  */}



            {/* bottom sheet  */}
            {/* 
            import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons'

import type { SheetProps } from '@tamagui/sheet'

import { Sheet, useSheet } from '@tamagui/sheet'

import { useState } from 'react'

import { Button, H1, H2, Input, Paragraph, XStack, YStack } from 'tamagui'
const spModes = ['percent', 'constant', 'fit', 'mixed'] as const
export const SheetDemo = () => {

  const [position, setPosition] = useState(0)

  const [open, setOpen] = useState(false)

  const [modal, setModal] = useState(true)

  const [innerOpen, setInnerOpen] = useState(false)

  const [snapPointsMode, setSnapPointsMode] =

    useState<(typeof spModes)[number]>('percent')

  const [mixedFitDemo, setMixedFitDemo] = useState(false)
  const isPercent = snapPointsMode === 'percent'

  const isConstant = snapPointsMode === 'constant'

  const isFit = snapPointsMode === 'fit'

  const isMixed = snapPointsMode === 'mixed'

  const snapPoints = isPercent

    ? [85, 50, 25]

    : isConstant

      ? [256, 190]

      : isFit

        ? undefined

        : mixedFitDemo

          ? ['fit', 110]

          : ['80%', 256, 190]
  return (

    <>

      <YStack space>

        <XStack space $sm={{ flexDirection: 'column', alignItems: 'center' }}>

          <Button onPress={() => setOpen(true)}>Open</Button>

          <Button onPress={() => setModal((x) => !x)}>

            {modal ? 'Type: Modal' : 'Type: Inline'}

          </Button>

          <Button
            onPress={() =>
              setSnapPointsMode(
                (prev) => spModes[(spModes.indexOf(prev) + 1) % spModes.length]
              )
            }
          >

            {`Mode: ${
              { percent: 'Percentage', constant: 'Constant', fit: 'Fit', mixed: 'Mixed' }[
                snapPointsMode
              ]
            }`}

          </Button>

        </XStack>

        {isMixed ? (

          <Button onPress={() => setMixedFitDemo((x) => !x)}>

            {`Snap Points: ${JSON.stringify(snapPoints)}`}

          </Button>

        ) : (

          <XStack paddingVertical="$2.5" justifyContent="center">

            <Paragraph>{`Snap Points: ${
              isFit ? '(none)' : JSON.stringify(snapPoints)
            }`}</Paragraph>

          </XStack>

        )}

      </YStack>
      <Sheet
        forceRemoveScrollEnabled={open}
        modal={modal}
        open={open}
        onOpenChange={setOpen}
        snapPoints={snapPoints}
        snapPointsMode={snapPointsMode}
        dismissOnSnapToBottom
        position={position}
        onPositionChange={setPosition}
        zIndex={100_000}
        animation="medium"
      >

        <Sheet.Overlay
          animation="lazy"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Sheet.Handle />

        <Sheet.Frame padding="$4" justifyContent="center" alignItems="center" space="$5">

          <Button size="$6" circular icon={ChevronDown} onPress={() => setOpen(false)} />

          <Input width={200} />

          {modal && isPercent && (

            <>

              <InnerSheet open={innerOpen} onOpenChange={setInnerOpen} />

              <Button
                size="$6"
                circular
                icon={ChevronUp}
                onPress={() => setInnerOpen(true)}
              />

            </>

          )}

        </Sheet.Frame>

      </Sheet>

    </>

  )

}
function InnerSheet(props: SheetProps) {

  return (

    <Sheet animation="medium" modal snapPoints={[90]} dismissOnSnapToBottom {...props}>

      <Sheet.Overlay
        animation="medium"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />

      <Sheet.Handle />

      <Sheet.Frame flex={1} justifyContent="center" alignItems="center" space="$5">

        <Sheet.ScrollView>

          <YStack p="$5" gap="$8">

            <Button
              size="$6"
              circular
              alignSelf="center"
              icon={ChevronDown}
              onPress={() => props.onOpenChange?.(false)}
            />

            <H2>Hello world</H2>

            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (

              <Paragraph key={i} size="$8">

                Eu officia sunt ipsum nisi dolore labore est laborum laborum in esse ad

                pariatur. Dolor excepteur esse deserunt voluptate labore ea. Exercitation

                ipsum deserunt occaecat cupidatat consequat est adipisicing velit

                cupidatat ullamco veniam aliquip reprehenderit officia. Officia labore

                culpa ullamco velit. In sit occaecat velit ipsum fugiat esse aliqua dolor

                sint.

              </Paragraph>

            ))}

          </YStack>

        </Sheet.ScrollView>

      </Sheet.Frame>

    </Sheet>

  )

}

            */}
            {/* bottom sheet  */}


            {/* accordian  */}
            {/* 
            export function AccordionDemo() {
  return (
    <Accordion overflow="hidden" width="$20" type="multiple">
      <Accordion.Item value="a1">
        <Accordion.Trigger flexDirection="row" justifyContent="space-between">
          {({
            open,
          }: {
            open: boolean
          }) => (
            <>
              <Paragraph>1. Take a cold shower</Paragraph>
              <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                <ChevronDown size="$1" />
              </Square>
            </>
          )}
        </Accordion.Trigger>
        <Accordion.HeightAnimator animation="medium">
          <Accordion.Content animation="medium" exitStyle={{ opacity: 0 }}>
            <Paragraph>
              Cold showers can help reduce inflammation, relieve pain, improve
              circulation, lower stress levels, and reduce muscle soreness and fatigue.
            </Paragraph>
          </Accordion.Content>
        </Accordion.HeightAnimator>
      </Accordion.Item>

      <Accordion.Item value="a2">
        <Accordion.Trigger flexDirection="row" justifyContent="space-between">
          {({
            open,
          }: {
            open: boolean
          }) => (
            <>
              <Paragraph>2. Eat 4 eggs</Paragraph>
              <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                <ChevronDown size="$1" />
              </Square>
            </>
          )}
        </Accordion.Trigger>
        <Accordion.HeightAnimator animation="medium">
          <Accordion.Content animation="medium" exitStyle={{ opacity: 0 }}>
            <Paragraph>
              Eggs have been a dietary staple since time immemorial and there’s good
              reason for their continued presence in our menus and meals.
            </Paragraph>
          </Accordion.Content>
        </Accordion.HeightAnimator>
      </Accordion.Item>
    </Accordion>
  )
}
            */}
            {/* accordian  */}


            {/* alert  */}
            {/* 
            export function AlertDialogDemo() {
  return (
    <AlertDialog native>
      <AlertDialog.Trigger asChild>
        <Button>Show Alert</Button>
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <AlertDialog.Content
          bordered
          elevate
          key="content"
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          y={0}
        >
          <YStack space>
            <AlertDialog.Title>Accept</AlertDialog.Title>
            <AlertDialog.Description>
              By pressing yes, you accept our terms and conditions.
            </AlertDialog.Description>

            <XStack space="$3" justifyContent="flex-end">
              <AlertDialog.Cancel asChild>
                <Button>Cancel</Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <Button theme="active">Accept</Button>
              </AlertDialog.Action>
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  )
}
            */}
            {/* alert  */}


            {/* spinner  */}
            {/* 
            import { Spinner, YStack } from 'tamagui'

export function SpinnerDemo() {
  return (
    <YStack padding="$3" space="$4" alignItems="center">
      <Spinner size="small" color="$green10" />
      <Spinner size="large" color="$orange10" />
    </YStack>
  )
}
            */}
            {/* spinner  */}

            {/* avatar  */}
            {/* 
            export function AvatarDemo() {
  return (
    <XStack alignItems="center" space="$6">
      <Avatar circular size="$10">
        <Avatar.Image
          accessibilityLabel="Cam"
          src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
        />
        <Avatar.Fallback backgroundColor="$blue10" />
      </Avatar>

      <Avatar circular size="$8">
        <Avatar.Image
          accessibilityLabel="Nate Wienert"
          src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?&w=100&h=100&dpr=2&q=80"
        />
        <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
      </Avatar>
    </XStack>
  )
}
            */}
            {/* end avatar  */}

            {/* notification  */}
            {/* 
            export const ToastDemo = () => {
  const [native, setNative] = React.useState(false)

  return (
    <YStack space alignItems="center">
      <ToastControl native={native} />
      <CurrentToast />

      <NativeOptions native={native} setNative={setNative} />
    </YStack>
  )
}

const CurrentToast = () => {
  const currentToast = useToastState()

  if (!currentToast || currentToast.isHandledNatively) return null
  return (
    <Toast
      key={currentToast.id}
      duration={currentToast.duration}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      y={0}
      opacity={1}
      scale={1}
      animation="100ms"
      viewportName={currentToast.viewportName}
    >
      <YStack>
        <Toast.Title>{currentToast.title}</Toast.Title>
        {!!currentToast.message && (
          <Toast.Description>{currentToast.message}</Toast.Description>
        )}
      </YStack>
    </Toast>
  )
}

const ToastControl = ({ native }: { native: boolean }) => {
  const toast = useToastController()
  return (
    <XStack space="$2" justifyContent="center">
      <Button
        onPress={() => {
          toast.show('Successfully saved!', {
            message: "Don't worry, we've got your data.",
            native,
          })
        }}
      >
        Show
      </Button>
      <Button
        onPress={() => {
          toast.hide()
        }}
      >
        Hide
      </Button>
    </XStack>
  )
}

const NativeOptions = ({
  native,
  setNative,
}: {
  native: boolean
  setNative: (native: boolean) => void
}) => {
  return (
    <XStack space="$3">
      <Label size="$1" onPress={() => setNative(false)}>
        Custom
      </Label>
      <Switch
        id="native-toggle"
        nativeID="native-toggle"
        theme="active"
        size="$1"
        checked={!!native}
        onCheckedChange={(val) => setNative(val)}
      >
        <Switch.Thumb
          animation={[
            'quick',
            {
              transform: {
                overshootClamping: true,
              },
            },
          ]}
        />
      </Switch>

      <Label size="$1" onPress={() => setNative(true)}>
        Native
      </Label>
    </XStack>
  )
}
            */}
            {/* notification  */}


            {/* select  */}
            {/* 
            export function SelectDemo() {
  return (
    <YStack gap="$4">
      <XStack ai="center" gap="$4">
        <Label htmlFor="select-demo-1" f={1} miw={80}>
          Custom
        </Label>
        <SelectDemoItem id="select-demo-1" />
      </XStack>

      <XStack ai="center" gap="$4">
        <Label htmlFor="select-demo-2" f={1} miw={80}>
          Native
        </Label>
        <SelectDemoItem id="select-demo-2" native />
      </XStack>
    </YStack>
  )
}

export function SelectDemoItem(props: SelectProps) {
  const [val, setVal] = useState('apple')

  return (
    <Select value={val} onValueChange={setVal} disablePreventBodyScroll {...props}>
      <Select.Trigger width={220} iconAfter={ChevronDown}>
        <Select.Value placeholder="Something" />
      </Select.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet
          native={!!props.native}
          modal
          dismissOnSnapToBottom
          animationConfig={{
            type: 'spring',
            damping: 20,
            mass: 1.2,
            stiffness: 250,
          }}
        >
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronUp size={20} />
          </YStack>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={['$background', 'transparent']}
            borderRadius="$4"
          />
        </Select.ScrollUpButton>

        <Select.Viewport
          // to do animations:
          // animation="quick"
          // animateOnly={['transform', 'opacity']}
          // enterStyle={{ o: 0, y: -10 }}
          // exitStyle={{ o: 0, y: 10 }}
          minWidth={200}
        >
          <Select.Group>
            <Select.Label>Fruits</Select.Label>
            {/* for longer lists memoizing these is useful */}
            {useMemo(
              () =>
                items.map((item, i) => {
                  return (
                    <Select.Item
                      index={i}
                      key={item.name}
                      value={item.name.toLowerCase()}
                    >
                      <Select.ItemText>{item.name}</Select.ItemText>
                      <Select.ItemIndicator marginLeft="auto">
                        <Check size={16} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  )
                }),
              [items]
            )}
          </Select.Group>
          {/* Native gets an extra icon */}
          {props.native && (
            <YStack
              position="absolute"
              right={0}
              top={0}
              bottom={0}
              alignItems="center"
              justifyContent="center"
              width={'$4'}
              pointerEvents="none"
            >
              <ChevronDown
                size={getFontSize((props.size as FontSizeTokens) ?? '$true')}
              />
            </YStack>
          )}
        </Select.Viewport>

        <Select.ScrollDownButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronDown size={20} />
          </YStack>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={['transparent', '$background']}
            borderRadius="$4"
          />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  )
}
            */}
            {/* end select  */}


            // separator 
            export function SeparatorDemo() {
              return (
                <YStack width="100%" maxWidth={300} marginHorizontal={15}>
                  <Paragraph fontWeight="800">Tamagui</Paragraph>
                  <Paragraph>A cross-platform component library.</Paragraph>
                  <Separator marginVertical={15} />
                  <XStack height={20} alignItems="center">
                    <Paragraph>Blog</Paragraph>
                    <Separator alignSelf="stretch" vertical marginHorizontal={15} />
                    <Paragraph>Docs</Paragraph>
                    <Separator alignSelf="stretch" vertical marginHorizontal={15} />
                    <Paragraph>Source</Paragraph>
                  </XStack>
                </YStack>
              )
            }
            // separator 

            // refresh control 

            import React from 'react';
            import {
              RefreshControl,
              SafeAreaView,
              ScrollView,
              StyleSheet,
              Text,
            } from 'react-native';
            
            const App = () => {
              const [refreshing, setRefreshing] = React.useState(false);
            
              const onRefresh = React.useCallback(() => {
                setRefreshing(true);
                setTimeout(() => {
                  setRefreshing(false);
                }, 2000);
              }, []);
            
              return (
                <SafeAreaView style={styles.container}>
                  <ScrollView
                    contentContainerStyle={styles.scrollView}
                    refreshControl={
                      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>
                    <Text>Pull down to see RefreshControl indicator</Text>
                  </ScrollView>
                </SafeAreaView>
              );
            };
            
            const styles = StyleSheet.create({
              container: {
                flex: 1,
              },
              scrollView: {
                flex: 1,
                backgroundColor: 'pink',
                alignItems: 'center',
                justifyContent: 'center',
              },
            });
            
            export default App;

            // refresh control 


        </View>
      </Container>
    </>