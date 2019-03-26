#include "pch.h"
#include "str.h"
#include <string>
#include <iostream>
using namespace std;

SeqString::SeqString()
{
	MaxSize = 256;
	str = new char[MaxSize];
	for (int i = 0; i < MaxSize; i++) {
		str[i] = '\0';
	}
}

SeqString::SeqString(SeqString &t)
{
	int Len = t.StrLength();
	str = new char[Len];
	int i;
	for (i = 0; i < Len; i++) {
		str[i] = t.str[i];
	}
	str[i] = '\0';
}
/*
SeqString::SeqString(SeqString &t)
{
	str=new char[Len];
	strcpy(str,t.str);
}
*/

SeqString::SeqString(char *t)
{
	MaxSize = strlen(t) + 1;
	str = new char[MaxSize];
	//strcpy(str, t.str);
	int i;
	for (i = 0; i < MaxSize-1; i++)
	{
		str[i] = *(t + i);
	}
	str[i] = '\0';
}


SeqString::~SeqString()
{
	delete str;
}

int SeqString::StrLength()
{
	int i = 0;
	for (;; i++)
	{
		if (str[i] == '\0')
			return i;
	}
}

int SeqString::index(SeqString T)
{
	int i, j, k;
	int m = T.StrLength();
	int n = StrLength();
	for (i = 0; i < n - m; i++)
	{
		j = 0; k = i;
		while(j<m&&str[k++]==T.str[j++])
		{
			;
		}
		if (j == m)
			return i;
		
	}
	return -1;
}

void SeqString::SubStr(SeqString s, int start, int len)
{
	int length = s.StrLength();
	if (start >= 0 && start <= length - 1 && len >= 0 && len <= length - start + 1) {
		int i;
		for (i = 0; i < len; i++)
		{
			str[i] = s.str[start + i];
		}
		str[i] = '\0';
	}
	else
		cout << "parameter error" << endl;
}

void SeqString::StrCon(SeqString s, SeqString t)
{
	int slen = strlen(s.str);
	int len = slen + strlen(t.str) + 1;
	int i;
	for (i = slen; i < len; i++)
		str[i] = t.str[i - slen];
	str[i] = '\0';
}

int SeqString::StrCom(SeqString t1)
{
	char *s, *t;
	s = str; t = t1.str;
	for (; *s == *t&&s != '\0'; s++, t++);
	return *s - *t;
}

void Insert(SeqString &S, SeqString S1, int i)
{
	int j, len1, len2;
	len1 = S.StrLength(); len2 = S1.StrLength();
	if (i > len1)
		cout << "Crossing" << endl;
	else
	{
		for (j = len1 - 1; j >= 1; j--)
			S.str[len2 + j] = S.str[j];
		for (j = 0; j < len2; j++)
			S.str[i + j - 1] = S1.str[j];
	}
}






















































