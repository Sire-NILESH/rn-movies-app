import { View, Text } from "react-native";
import React from "react";

interface IProps {
  tvMediaId: number;
}

const Seasons: React.FC<IProps> = (props) => {
  // const data = {"_dispatchInstances": {"_debugHookTypes": null, "_debugNeedsRemount": false, "_debugOwner": {"_debugHookTypes": null, "_debugNeedsRemount": false, "_debugOwner": [FiberNode], "_debugSource": undefined, "actualDuration": 7.499699980020523, "actualStartTime": 96868630.47886, "alternate": null, "child": [Circular], "childLanes": 0, "deletions": null, "dependencies": [Object], "elementType": [Object], "flags": 1, "index": 0, "key": null, "lanes": 0, "memoizedProps": [Object], "memoizedState": null, "mode": 2, "pendingProps": [Object], "ref": null, "return": [FiberNode], "selfBaseDuration": 0.1151999980211258, "sibling": null, "stateNode": null, "subtreeFlags": 0, "tag": 9, "treeBaseDuration": 5.131199985742569, "type": [Object], "updateQueue": null}, "_debugSource": undefined, "actualDuration": 7.360899984836578, "actualStartTime": 96868631.31406, "alternate": null, "child": null, "childLanes": 0, "deletions": null, "dependencies": null, "elementType": "RCTImageView", "flags": 0, "index": 0, "key": null, "lanes": 0, "memoizedProps": {"children": undefined, "defaultSrc": null, "headers": undefined, "loadingIndicatorSrc": null, "onError": [Function onError], "resizeMode": "contain", "shouldNotifyLoadEvents": true, "source": [Object], "src": [Array], "style": [Object]}, "memoizedState": null, "mode": 2, "pendingProps": {"children": undefined, "defaultSrc": null, "headers": undefined, "loadingIndicatorSrc": null, "onError": [Function onError], "resizeMode": "contain", "shouldNotifyLoadEvents": true, "source": [Object], "src": [Array], "style": [Object]}, "ref": null, "return": {"_debugHookTypes": null, "_debugNeedsRemount": false, "_debugOwner": [FiberNode], "_debugSource": undefined, "actualDuration": 7.499699980020523, "actualStartTime": 96868630.47886, "alternate": null, "child": [Circular], "childLanes": 0, "deletions": null, "dependencies": [Object], "elementType": [Object], "flags": 1, "index": 0, "key": null, "lanes": 0, "memoizedProps": [Object], "memoizedState": null, "mode": 2, "pendingProps": [Object], "ref": null, "return": [FiberNode], "selfBaseDuration": 0.1151999980211258, "sibling": null, "stateNode": null, "subtreeFlags": 0, "tag": 9, "treeBaseDuration": 5.131199985742569, "type": [Object], "updateQueue": null}, "selfBaseDuration": 5.015999987721443, "sibling": null, "stateNode": {"_children": [Array], "_internalFiberInstanceHandleDEV": [Circular], "_nativeTag": 25513, "viewConfig": [Object]}, "subtreeFlags": 0, "tag": 5, "treeBaseDuration": 5.015999987721443, "type": "RCTImageView", "updateQueue": null}, "_dispatchListeners": [Function onError], "_targetInst": {"_debugHookTypes": null, "_debugNeedsRemount": false, "_debugOwner": {"_debugHookTypes": null, "_debugNeedsRemount": false, "_debugOwner": [FiberNode], "_debugSource": undefined, "actualDuration": 7.499699980020523, "actualStartTime": 96868630.47886, "alternate": null, "child": [Circular], "childLanes": 0, "deletions": null, "dependencies": [Object], "elementType": [Object], "flags": 1, "index": 0, "key": null, "lanes": 0, "memoizedProps": [Object], "memoizedState": null, "mode": 2, "pendingProps": [Object], "ref": null, "return": [FiberNode], "selfBaseDuration": 0.1151999980211258, "sibling": null, "stateNode": null, "subtreeFlags": 0, "tag": 9, "treeBaseDuration": 5.131199985742569, "type": [Object], "updateQueue": null}, "_debugSource": undefined, "actualDuration": 7.360899984836578, "actualStartTime": 96868631.31406, "alternate": null, "child": null, "childLanes": 0, "deletions": null, "dependencies": null, "elementType": "RCTImageView", "flags": 0, "index": 0, "key": null, "lanes": 0, "memoizedProps": {"children": undefined, "defaultSrc": null, "headers": undefined, "loadingIndicatorSrc": null, "onError": [Function onError], "resizeMode": "contain", "shouldNotifyLoadEvents": true, "source": [Object], "src": [Array], "style": [Object]}, "memoizedState": null, "mode": 2, "pendingProps": {"children": undefined, "defaultSrc": null, "headers": undefined, "loadingIndicatorSrc": null, "onError": [Function onError], "resizeMode": "contain", "shouldNotifyLoadEvents": true, "source": [Object], "src": [Array], "style": [Object]}, "ref": null, "return": {"_debugHookTypes": null, "_debugNeedsRemount": false, "_debugOwner": [FiberNode], "_debugSource": undefined, "actualDuration": 7.499699980020523, "actualStartTime": 96868630.47886, "alternate": null, "child": [Circular], "childLanes": 0, "deletions": null, "dependencies": [Object], "elementType": [Object], "flags": 1, "index": 0, "key": null, "lanes": 0, "memoizedProps": [Object], "memoizedState": null, "mode": 2, "pendingProps": [Object], "ref": null, "return": [FiberNode], "selfBaseDuration": 0.1151999980211258, "sibling": null, "stateNode": null, "subtreeFlags": 0, "tag": 9, "treeBaseDuration": 5.131199985742569, "type": [Object], "updateQueue": null}, "selfBaseDuration": 5.015999987721443, "sibling": null, "stateNode": {"_children": [Array], "_internalFiberInstanceHandleDEV": [Circular], "_nativeTag": 25513, "viewConfig": [Object]}, "subtreeFlags": 0, "tag": 5, "treeBaseDuration": 5.015999987721443, "type": "RCTImageView", "updateQueue": null}, "bubbles": undefined, "cancelable": undefined, "currentTarget": {"_children": [], "_internalFiberInstanceHandleDEV": {"_debugHookTypes": null, "_debugNeedsRemount": false, "_debugOwner": [FiberNode], "_debugSource": undefined, "actualDuration": 7.360899984836578, "actualStartTime": 96868631.31406, "alternate": null, "child": null, "childLanes": 0, "deletions": null, "dependencies": null, "elementType": "RCTImageView", "flags": 0, "index": 0, "key": null, "lanes": 0, "memoizedProps": [Object], "memoizedState": null, "mode": 2, "pendingProps": [Object], "ref": null, "return": [FiberNode], "selfBaseDuration": 5.015999987721443, "sibling": null, "stateNode": [Circular], "subtreeFlags": 0, "tag": 5, "treeBaseDuration": 5.015999987721443, "type": "RCTImageView", "updateQueue": null}, "_nativeTag": 25513, "viewConfig": {"NativeProps": [Object], "bubblingEventTypes": [Object], "directEventTypes": [Object], "uiViewClassName": "RCTImageView", "validAttributes": [Object]}}, "defaultPrevented": undefined, "dispatchConfig": {"registrationName": "onError"}, "eventPhase": undefined, "isDefaultPrevented": [Function functionThatReturnsFalse], "isPropagationStopped": [Function functionThatReturnsFalse], "isTrusted": undefined, "nativeEvent": {"error": "unknown image format"}, "target": {"_children": [], "_internalFiberInstanceHandleDEV": {"_debugHookTypes": null, "_debugNeedsRemount": false, "_debugOwner": [FiberNode], "_debugSource": undefined, "actualDuration": 7.360899984836578, "actualStartTime": 96868631.31406, "alternate": null, "child": null, "childLanes": 0, "deletions": null, "dependencies": null, "elementType": "RCTImageView", "flags": 0, "index": 0, "key": null, "lanes": 0, "memoizedProps": [Object], "memoizedState": null, "mode": 2, "pendingProps": [Object], "ref": null, "return": [FiberNode], "selfBaseDuration": 5.015999987721443, "sibling": null, "stateNode": [Circular], "subtreeFlags": 0, "tag": 5, "treeBaseDuration": 5.015999987721443, "type": "RCTImageView", "updateQueue": null}, "_nativeTag": 25513, "viewConfig": {"NativeProps": [Object], "bubblingEventTypes": [Object], "directEventTypes": [Object], "uiViewClassName": "RCTImageView", "validAttributes": [Object]}}, "timeStamp": 1680542343989, "type": undefined}

  return (
    <View className="flex-1 px-4 space-y-4">
      <Text className="text-xl text-gray-50">Seasons</Text>
      <View className="flex-row flex-wrap gap-2">
        <Text className="text-gray-50 bg-orange-600/40 border border-orange-100 rounded-full px-3 py-2">
          One
        </Text>
        <Text className="text-gray-50 bg-orange-600/30 border border-orange-900 rounded-full px-3 py-2">
          Two
        </Text>
        <Text className="text-gray-50 bg-orange-600/50 border border-orange-900 rounded-full px-3 py-2">
          ✔️ Three
        </Text>
        <Text className="text-gray-50 bg-orange-600/50 border border-orange-900 rounded-full px-3 py-2">
          ✔️ Four
        </Text>
        <Text className="text-gray-50 bg-orange-600/40 border border-orange-900 rounded-full px-3 py-2">
          Five
        </Text>
        <Text className="text-gray-50 bg-orange-600/50 border border-orange-900 rounded-full px-3 py-2">
          Six
        </Text>
        <Text className="text-gray-50 bg-orange-600/30 border border-orange-900 rounded-full px-3 py-2">
          Seven
        </Text>
        <Text className="text-gray-50 bg-orange-600/10 border border-orange-900 rounded-full px-3 py-2">
          Eight
        </Text>
        <Text className="text-gray-50 bg-orange-600/30 border border-orange-900 rounded-full px-3 py-2">
          Nine
        </Text>
        <Text className="text-gray-50 bg-orange-600/10 border border-orange-900 rounded-full px-3 py-2">
          Ten
        </Text>
        <Text className="text-gray-50 bg-orange-600/10 border border-orange-900 rounded-full px-3 py-2">
          Eleven
        </Text>
        <Text className="text-gray-50 bg-orange-600/10 border border-orange-900 rounded-full px-3 py-2">
          Twelve
        </Text>
      </View>
      <View>
        <Text className="text-gray-300">Episodes</Text>
      </View>
    </View>
  );
};

export default Seasons;
