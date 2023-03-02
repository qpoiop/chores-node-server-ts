### TODO

-   모든 에러 포맷 json으로 변경
-   JWT token 강제 만료 (logout)
-   DB connection 설정 테스트
-   트래픽 부하 테스트
-   요청 별 로깅 (middleware)

### SYSTEMID 생성 규칙

-   16자리 랜덤코드 유니크,
-   규칙 : U + 고객사(숫자1,2,3) + 랜덤1자리 (숫자) + 11자리 [idx + 'Z'+ 남은자리 숫자랜덤 3개 나머지는 영어 랜덤으로 처리] + 'Z' 랜덤1자리 (숫자영문)\n

```java
    public static String generateUniqueId(String prefix, String depth, Integer idx) {
        StringBuffer sb = new StringBuffer();
        Random rnd = new Random();
        sb.append(prefix);

        //랜덤 2자리 숫자
        if (StringUtils.hasText(depth)) {
            sb.append(depth);
            sb.append(rnd.nextInt(10));
        } else {
            for (int i = 0; i < 2; i++) {
                sb.append(rnd.nextInt(10));
            }
        }

        //11자리
        StringBuffer sb2 = new StringBuffer();
        sb2.append(idx);
        sb2.append("Z");

        //랜덤 3자리 숫자
        for (int i = 0; i < 3; i++) {
            sb2.append(rnd.nextInt(10));
        }

        //남은 자리수
        sb2.append(generateUpperAlphabets(11 - sb2.length()));
        sb.append(sb2);
        sb.append("Z");

        //true일 시 랜덤 한 대문자를, false 일 시 랜덤 한 숫자 추가
        if (rnd.nextBoolean()) {
            sb.append(generateUpperAlphabets(1));
        } else {
            sb.append(rnd.nextInt(10));
        }
        return sb.toString();
    }
```
