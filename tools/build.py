# ko/b*.tsv(번호<TAB>번역)를 missing-keys.json 순서에 맞춰 ../themes/chaeum/ko.json({"ko": {...}}) 으로 묶는다.
# missing-keys.json: 웹 원본(dffb380)에 한국어가 없는 문구, missing-de.json: 같은 문구의 독일어(복수형인지 보려고 씀). 자리표시자(%{..})가 다르면 알린다.
import json,re,glob,os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
keys=json.load(open('missing-keys.json')); src=json.load(open('missing-de.json'))
tr={}
for f in sorted(glob.glob('ko/b*.tsv')):
    for line in open(f,encoding='utf-8'):
        line=line.rstrip('\n')
        if line: i,t=line.split('\t',1); tr[int(i)]=t
ph=re.compile(r'%\{\s*\w+\s*\}'); norm=lambda s:set(re.sub(r'\s','',p) for p in ph.findall(s))
out={}
for i,k in enumerate(keys):
    t=tr[i]
    if norm(k)!=norm(t): print('자리표시자 다름',i,k,t)
    out[k]=[t] if isinstance(src.get(k),list) else t
out.update(json.load(open('ko/overrides.json')))  # 원래 번역 중 공간→스페이스, 할당량→용량
json.dump({'ko':out},open('../themes/chaeum/ko.json','w'),ensure_ascii=False,indent=1)
print(len(out),'개')
