#!/usr/bin/env python2

import requests
import json

def main():
    toc = requests.get('https://www.sefaria.org/api/index/').json()
    mishna_js = []
    for category in toc:
        if category['category'] != 'Mishnah':
            continue
        for seder in category['contents']:
            for masechet in seder['contents']:
                print masechet['title']
                _text = requests.get('https://www.sefaria.org/api/texts/'+masechet['title']+'?pad=0').json()
                mishna_js.append(dict(name=masechet['heTitle'], text=_text['he']))
            if masechet['title'] == 'Mishnah Oktzin':
                open('/tmp/mishna.json', 'w+').write(json.dumps(mishna_js, indent=1))
                return


if __name__ == '__main__':
    main()