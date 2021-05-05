import { borderBottom, container } from '@styles/styleRules';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Block, Click, Logo, Text, useTheme, View } from 'vcc-ui';

const Header = () => {
  const { baselineGrid } = useTheme();

  return (
    <View
      extend={{ ...container, ...borderBottom }}
      marginBottom={6}
      paddingTop={1}
      paddingBottom={2}
      alignItems="center">
      <Link href="/" passHref>
        <Click
          extend={{
            display: 'flex',
            flecDirection: 'row',
            alignItems: 'center'
          }}>
          <Block
            extend={{
              width: '32px'
            }}>
            <Image src="/dog-logo.svg" width={120} height={123} layout="intrinsic" />
          </Block>
          <View alignItems="center" marginLeft={2}>
            <Text variant="hillary" subStyle="emphasis">
              Hundpatrullen
            </Text>

            <View direction="row" alignItems="center">
              <Text
                variant="bates"
                subStyle="emphasis"
                extend={{ marginRight: `${baselineGrid}px` }}>
                by
              </Text>

              <Block extend={{ marginTop: '2px' }}>
                <Logo type="spreadmark" height={6} />
              </Block>
            </View>
          </View>
        </Click>
      </Link>
    </View>
  );
};

export default Header;
