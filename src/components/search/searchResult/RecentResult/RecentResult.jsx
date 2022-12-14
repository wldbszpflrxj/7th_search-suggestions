import React from 'react';
import * as Styled from '@/components/search/searchResult/RecentResult/RecentResult.styled';
import RecentKeywordItem from '@/components/search/RecentKeywordItem/RecentKeywordItem';

const RecentResult = () => {
  const keywordHistory = ['B형간염', '비만', '관절염', '우울증', '동맥경화', '독감', '일본뇌염'];
  return (
    <>
      <Styled.RecentKeywordBox>
        <Styled.SubText>최근검색어</Styled.SubText>
        {keywordHistory.map((recentKeywordList, i) => (
          <RecentKeywordItem recentKeywordList={recentKeywordList} key={i} />
        ))}
      </Styled.RecentKeywordBox>
      <Styled.SuggestionKeywordWrraper>
        <Styled.SubText>추천 검색어로 검색해보세요</Styled.SubText>
        <div>
          <Styled.SuggestionKeyword>B형 간염</Styled.SuggestionKeyword>
          <Styled.SuggestionKeyword>비만</Styled.SuggestionKeyword>
          <Styled.SuggestionKeyword>관절염</Styled.SuggestionKeyword>
          <Styled.SuggestionKeyword>우울증</Styled.SuggestionKeyword>
          <Styled.SuggestionKeyword>식도염</Styled.SuggestionKeyword>
        </div>
      </Styled.SuggestionKeywordWrraper>
    </>
  );
};

export default RecentResult;
