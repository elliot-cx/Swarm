import type { ReactNode, MouseEventHandler } from 'react';
import styles from './Section.module.css';

type Link={
  // this type is used fot the links <a> passed as props
  // It includes a route, a html id, a text <p>, a font awesome icon, a font awesome icon size and 
  // a MouseEventHandler for the onClick listener
  route:string,
  id?:string,
  text?:string,
  description?:string,
  classNames?:string[],
  onClickEvent?:MouseEventHandler<HTMLAnchorElement>
  onMouseHoverEvent?:any,
  onMouseEnter?:any,
  onMouseLeave?:any
}
type Props = {
// Typed used for the props of this component, it includes an html id, <h1> title, <h2> title, <p> text,
// an array of links <a> and functions to run  
  classNames?:string[]
  id?:string
  linksDivClasses?:string[],
title1?:string | ReactNode
  title2?:string | ReactNode
  text?:string | ReactNode
  links?:Array<Link>,
  contentChildrenNodes?:ReactNode,
  childrenNodes?:ReactNode,
}
export default function Section({
    classNames,
    linksDivClasses,
    id,
    links,
    text,
    title1,
    title2,
    childrenNodes,
    contentChildrenNodes,
}: Props) {

    const getClassNameString = (classNames: string[] | undefined): string => {
        if (!classNames) return '';
        return classNames.map((className) => styles[className] ?? '').join(' ');
    };
  
  
    return (
        <div className={`${getClassNameString(classNames)} ${styles.section}`} id={id ? styles[id] : undefined}>
            { title1 
                ? <> 
                    <h1 className={styles.sectionTitle}>{title1}</h1>
                    <div className={styles.horizontalSeparator}></div> 
                </> 
                : null }
            
            { title2 ||  text || links || contentChildrenNodes ? 
                <div className={styles.content}>
                    { title2 && typeof title2 == 'string' ? <h2 className={styles.sectionTitle2}>{title2}</h2> : title2 }
                    { text && typeof text == 'string' ? <p className={styles.sectionText}>{text}</p> : text }
                    { links 
                        ? <div className={`${styles.linksDiv} ${getClassNameString(linksDivClasses)}`}>
                            {links.map((link: Link, index: number) => {
                                return(
                                    <a key={index} className={styles.link + getClassNameString(link.classNames)} id={link.id ? styles[link.id] : undefined} href={link.route} 
                                        onMouseOver={link?.onMouseHoverEvent} onMouseEnter={link?.onMouseEnter} onMouseLeave={link?.onMouseLeave} onClick={link?.onClickEvent}>
                                        <p>{link.text}</p>
                                        {link.description ? <p className={styles.linkDescription}>{link.description}</p> : null}
                                    </a>
                                );
                            })}
                        </div>
                        : null}
                    { contentChildrenNodes
                        ? contentChildrenNodes
                        : null}
                </div>
                : null}
            { childrenNodes 
                ? childrenNodes
                : null}
        </div>
    );
}
