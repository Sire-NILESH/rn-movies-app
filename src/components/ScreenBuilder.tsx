import { View, ScrollView } from "react-native";
import { MovieMedia, TvMedia } from "../typings";
import { useLogging } from "./../hooks/useLogging";
import Banner from "./Banner";
import Row from "./Row";
import { SafeAreaView } from "react-native-safe-area-context";

interface IMedias {
  genreId: number;
  genreName: string;
  genreMedias: MovieMedia[] | TvMedia[];
}

interface IProps {
  contents: IMedias[];
}

const ScreenBuilder: React.FC<IProps> = ({ contents }) => {
  const [logging] = useLogging("ScreenBuilder Screen");

  return (
    <View className="flex-1 bg-stone-900">
      <View className="flex-1">
        {contents ? (
          <ScrollView className="space-y-10">
            <Banner mediaList={contents[0].genreMedias} />

            {contents.map((m) => {
              if (m && m.genreMedias.length > 0) {
                return (
                  <Row
                    key={m.genreId}
                    title={m.genreName}
                    medias={m.genreMedias}
                    genreIdOfList={m.genreId}
                  />
                );
              } else null;
            })}
          </ScrollView>
        ) : null}
      </View>
    </View>
  );
};

export default ScreenBuilder;
