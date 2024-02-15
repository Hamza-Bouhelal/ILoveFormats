import { Divider } from "@nextui-org/react";
import ConversionCard from "./Components/ConversionCard";
import {
  conversionConfig,
  extentionToFileType,
} from "../../utils/conversionConfig";
import { useAuthentificatedPage } from "../../Common/Hooks/useIsAuthentificated";

export default function Dashboard() {
  useAuthentificatedPage();

  const fromFormats = Object.keys(conversionConfig);
  return (
    <div className="mt-[30px]">
      {fromFormats.map((fromFormat, idx) => {
        const supportedFormats = conversionConfig[fromFormat];
        const title = `Convert from ${extentionToFileType[fromFormat]}`;
        return (
          <>
            <h1 className="mt-4 font-bold text-4xl ml-[50px]">{title}</h1>
            <ConversionCard.Container>
              {Object.keys(supportedFormats).map((toFormat) => {
                const isSupported = supportedFormats[toFormat];

                if (isSupported) {
                  const title = `${fromFormat} To ${toFormat}`;
                  const description = conversionConfig[fromFormat][toFormat];
                  const redirectTo = `/convert?from=${fromFormat.toLowerCase()}&to=${toFormat.toLowerCase()}`;

                  return (
                    <ConversionCard.Card
                      key={`${fromFormat}-${toFormat}`}
                      title={title}
                      description={description}
                      redirectTo={redirectTo}
                    />
                  );
                }

                return null;
              })}
            </ConversionCard.Container>
            {idx !== fromFormats.length - 1 && (
              <Divider className="my-8 mx-auto w-[90%]" />
            )}
          </>
        );
      })}
    </div>
  );
}
