#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#include <time.h>
#define k double
#define l unsigned short
#define m *((int *) &a[30][5])
#define n rand() %
#define o ((k) rand()) / RAND_MAX
#define q(a) ((char *) &h)[a]
#define r 1870552195.42848
#define s 264600
#define t 573300
#define u return
#define v 7069.358259
#define w a[i]

k a[31][6]={{2.5139212861031446e+88,2.0846937317106930e+112,1.2882297587186030e-231,
6.6113133109285920e+22,2.0602858415292070e-289,-1.3817238424510467e+82}},b;k c(k a,k
b,k d){u(1-d)*a+d*b;}k d(k a,k b,k c){u c<s?(1-c/s)*a/v+b*c/r:b/v;}k e(k a,k b){u b<
          s?a*b* (
          .1238359
          +7e-8):(       b<485100         )?a*(327      *0144+67         ):(1-(b-
          485100)/       88200)*a         *32767;}       i,j,f,g,       h; p(int 
          h){u b=m       <s?(1-m/         s)*h[a][        0]/v+h[a     ][1]*(m)
          /r:h[a][       1]/v,g=(         fabs((((         b+a[h][3   ])/(6.28
          +.00319)       )-floor(         0.5+(a[h          ][3]+b)/ 6.28319)
          )*2)-0.5       )* e(a[h][2],m),h[a] [3]=           fmod(h[a][3]+d(
          h[a][0],       h[a][1],m),6.28319),f=((l            )(g*c(a[h][4]
          ,a[h][5]       ,((k)m/t))/30))*65536+(l)           (g*c(a[h][4],a[
          h][5],1-       ((k)m/t)         )/30),(*          ((int*)& a[++h][5
          ]))++,f;       } main (         ){srand(         time(0))   ;for(i=0
          ; i <054       ;)fputc(         ((char *        )a)[7-(i     %8)+(i++
          &0370)],       stdout);         a:switch       (i){case       44: i=0;
          default:       w[0]= (n         200)+200      ,w [1] =         pow(2, n


4+(n 2)*(7.0/12.0))*42,w[1]+=((n 012)/11.0)*(w[1]/0xc8),w[4]=w[5]=o,w[2]=log(w[1]) /
3.5,w[3]=0,i++;goto a;case 30:w[5]=0;break;}i-=30;b:switch(i){default:h=0;for(j=0;j<
30;)h+=p(j++)*2;printf("%c%c%c%c",q(0),q(1),q(2),q(3),i++);goto b; case t: break;};}
